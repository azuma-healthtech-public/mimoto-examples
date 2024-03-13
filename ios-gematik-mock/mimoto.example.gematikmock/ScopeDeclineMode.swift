//
//  ScopeDeclineMode.swift
//  mimoto.example.gematikmock
//
//  Created by Eugen Wachtel on 13.03.24.
//

import Foundation

struct ScopeDeclineMode: Hashable {
    public var name = "";
    public var id = "";
    
    static func ==(lhs: ScopeDeclineMode, rhs: ScopeDeclineMode) -> Bool {
            return lhs.id == rhs.id
        }

        func hash(into hasher: inout Hasher) {
            hasher.combine(id)
        }
    
    static var Modes: [ScopeDeclineMode] = [
        ScopeDeclineMode(name: "Remove claims", id: "RemoveClaims"),
        ScopeDeclineMode(name: "Add empty claims", id: "AddEmptyClaims")
    ]
    
}
