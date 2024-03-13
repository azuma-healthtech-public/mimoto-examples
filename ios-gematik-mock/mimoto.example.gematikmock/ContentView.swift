//
//  ContentView.swift
//  ios-gematik-mock
//
//  Created by user251243 on 12/7/23.
//

import SwiftUI

struct ContentView: View
{
    @State private var loginEnabled = false
    @State var authData = "..."
    
    @State private var userSelection = "X110411675"
    @State private var scopeDeclineSelection = "RemoveClaims"
    
    @State private var scopeOpenid = true
    @State private var scopeAlter = true
    @State private var scopeADisplayName = true
    @State private var scopeEmail = true
    @State private var scopeGeburtsdatum = true
    @State private var scopeGeschlecht = true
    @State private var scopeVersicherter = true
    @State private var scopeGivenName = true
    
    @State private var showingAdvancedOptions = false
    @State private var overrideHealthIdText = ""
    
    var body: some View {
        VStack {
            Text("Mimoto Demo: gematik IDP")
            Spacer()
            
            Text("Auth Data")
            Text(authData)
            
            Spacer()
            
            ProgressView()
                .hidden()
            
            Spacer()
            
            Form {
                Section( header: Text("Login user")) {
                    Picker("User", selection: $userSelection) {
                        ForEach(AvailableUsers.Users.sorted(by: { a, b in
                            a.name < b.name
                        }), id: \.self.healthId) {
                            Text($0.name + " (" + $0.healthId + ")")
                                .lineLimit(1)
                                .truncationMode(.tail)
                        }
                    }
                    .pickerStyle(.menu)
                    .labelsHidden()
                    .lineLimit(1)
                    .truncationMode(.tail)
                }
                Toggle("Show advanced options", isOn: $showingAdvancedOptions.animation())
                if showingAdvancedOptions {
                    Section(header: Text("Selected scopes (all possible scopes are displayed)")) {
                        Toggle("openid", isOn: $scopeOpenid)
                        Toggle("urn:telematik:alter", isOn: $scopeAlter)
                        Toggle("urn:telematik:display_name", isOn: $scopeADisplayName)
                        Toggle("urn:telematik:email", isOn: $scopeEmail)
                        Toggle("urn:telematik:geburtsdatum", isOn: $scopeGeburtsdatum)
                        Toggle("urn:telematik:geschlecht", isOn: $scopeGeschlecht)
                        Toggle("urn:telematik:given_name", isOn: $scopeGivenName)
                        Toggle("urn:telematik:versicherter", isOn: $scopeVersicherter)
                    }
                    Section(header: Text("Scope decline mode")) {
                        Picker("Mode", selection: $scopeDeclineSelection) {
                            ForEach(ScopeDeclineMode.Modes, id: \.self.id) {
                                Text($0.name)
                            }
                        }
                        .pickerStyle(.menu)
                    }
                    Section(header: Text("Override health ID")) { 
                        TextEditor(text: $overrideHealthIdText)
                        
                    }
                }
                Section {
                    Button(
                        action: {sendHttpPost()},
                        label: { Text("Login (gematik IDP)")})
                    .disabled(!loginEnabled)
                }
            }
            
            Spacer()
            Text("by azuma")
        }
        .padding()
        
        .onOpenURL { url in
            print(url.absoluteString)
            
            authData = url.absoluteString
            loginEnabled = true
        }
    }
    
    func sendHttpPost() {
        var scopes: [String] = []
        if(scopeOpenid) {
            scopes.append("openid")
        }
        if(scopeAlter) {
            scopes.append("urn:telematik:alter")
        }
        if(scopeEmail) {
            scopes.append("urn:telematik:email")
        }
        if(scopeGeschlecht) {
            scopes.append("urn:telematik:geschlecht")
        }
        if(scopeGeburtsdatum) {
            scopes.append("urn:telematik:geburtsdatum")
        }
        if(scopeVersicherter) {
            scopes.append("urn:telematik:versicherter")
        }
        if(scopeGivenName) {
            scopes.append("urn:telematik:given_name")
        }
        if(scopeADisplayName) {
            scopes.append("urn:telematik:display_name")
        }
        
        let r = LoginTask()
        let requestData = LoginRequest(
            url: authData,
            gematik_enable_testing: true,
            gematik_login_user: userSelection,
            gematik_selected_scopes: scopes,
            gematik_scope_decline_mode: scopeDeclineSelection,
            gematik_override_health_id: overrideHealthIdText
        )
        
        r.makeRequest(requestData: requestData)
        
        
        
        // reset values to default
        loginEnabled = false
        authData = "..."
        
        userSelection = "X110411675"
        scopeDeclineSelection = "RemoveClaims"
        
        scopeOpenid = true
        scopeAlter = true
        scopeADisplayName = true
        scopeEmail = true
        scopeGeburtsdatum = true
        scopeGeschlecht = true
        scopeVersicherter = true
        scopeGivenName = true
        
        showingAdvancedOptions = false
        overrideHealthIdText = ""
    }
}

#Preview {
    ContentView()
}

class LoginTask : NSObject {
    var session: URLSession?
    
    override init() {
        super.init()
        session = URLSession(configuration: .default, delegate: self,	 delegateQueue: nil)
    }
    
    func makeRequest(requestData: LoginRequest) {
        print("Execute demo login");
        let jsonData = try? JSONEncoder().encode(requestData)
        
        // create post request
        let url = URL(string: "https://mimoto-test.pie.azuma-health.tech/api/demo/login")!
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.httpBody = jsonData
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")
        request.addValue("application/json", forHTTPHeaderField: "Accept")
        
        let task = session?.dataTask(with: request) { data, response, error in
            if let response = response as? HTTPURLResponse {
                guard let data = data, error == nil else {
                    print(error?.localizedDescription ?? "No data")
                    return
                }
                if response.statusCode == 200 {
                    print("Success")
                    
                    let responseData = try? JSONDecoder().decode(
                        LoginResponse.self,
                        from: data
                    )
                    let responseUrl = responseData?.url
                    let locationUrl = URL(string: responseUrl!)!
                    DispatchQueue.main.async {
                        Task {
                            await UIApplication.shared.open (locationUrl)
                        }
                    }
                    return;
                }
            }
            print("Failed")
        }
        task?.resume() // <- otherwise your network request won't be started
    }
}

struct LoginResponse: Decodable {
    var url: String
}

struct LoginRequest: Codable {
    var url: String
    
    var gematik_enable_testing: Bool
    var gematik_login_user: String
    var gematik_selected_scopes: [String]
    var gematik_scope_decline_mode: String
    var gematik_override_health_id: String
}

extension LoginTask: URLSessionDelegate, URLSessionTaskDelegate {
    func urlSession(_ session: URLSession, task: URLSessionTask, willPerformHTTPRedirection response: HTTPURLResponse, newRequest request: URLRequest, completionHandler: @escaping (URLRequest?) -> Void) {
        // Stops the redirection, and returns (internally) the response body.
        completionHandler(nil)
    }
}
