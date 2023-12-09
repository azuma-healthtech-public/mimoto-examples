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
    private var loginHeader = "GEMATIK_AUTH_HEADER_HERE"
    
    
    var body: some View {
        VStack {
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
        r.makeRequest(authData: authData, loginHeader: loginHeader)
        
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
    
    func makeRequest(authData: String, loginHeader: String) {
        // prepare link
        let originalUrl = authData.replacingOccurrences(of: "https://mimoto-gematik-mock.azuma-health.tech/idp/par?redirect=$", with: "")
        print("Original url:")
        print(originalUrl)
        
        
        let loginUrl = originalUrl.replacingOccurrences(of: "https://gsi.dev.gematik.solutions/auth?", with: "https://gsi.dev.gematik.solutions/auth?user_id=12345678&")
        print("Login url:")
        print(loginUrl)
        
        var request = URLRequest(url: URL(string: loginUrl)!)
        request.httpMethod = "GET"
        request.addValue(loginHeader, forHTTPHeaderField: "X-Authorization")
        
        let task = session?.dataTask(with: request) { data, response, error in
            print(data as Any)
            print(response as Any)
            print(error as Any)
            
            if let response = response as? HTTPURLResponse {
                
                if response.statusCode == 302 {
                    print("Success")
                    
                    let location = response.allHeaderFields["Location"] as? String ?? ""
                    print(location)
                    
                    let locationUrl = URL(string: location)!
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

extension LoginTask: URLSessionDelegate, URLSessionTaskDelegate {
    func urlSession(_ session: URLSession, task: URLSessionTask, willPerformHTTPRedirection response: HTTPURLResponse, newRequest request: URLRequest, completionHandler: @escaping (URLRequest?) -> Void) {
        // Stops the redirection, and returns (internally) the response body.
        completionHandler(nil)
    }
}
