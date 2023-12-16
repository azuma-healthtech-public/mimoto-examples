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
            
            Button(
                action: {sendHttpPost()},
                label: { Text("Login (gematik IDP)")})
            .disabled(!loginEnabled)
            
            Spacer()
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
        
        let r = LoginTask()
        r.makeRequest(authData: authData)
        
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
    
    func makeRequest(authData: String) {
        print("Execute demo login");
        let requestData = LoginRequest(
            url: authData
        )
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
}

extension LoginTask: URLSessionDelegate, URLSessionTaskDelegate {
    func urlSession(_ session: URLSession, task: URLSessionTask, willPerformHTTPRedirection response: HTTPURLResponse, newRequest request: URLRequest, completionHandler: @escaping (URLRequest?) -> Void) {
        // Stops the redirection, and returns (internally) the response body.
        completionHandler(nil)
    }
}
