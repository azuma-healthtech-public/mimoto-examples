//
//  AvailableUsers.swift
//  mimoto.example.gematikmock
//
//  Created by Eugen Wachtel on 13.03.24.
//

import Foundation

struct AvailableUsers: Hashable {
    public var name = "";
    public var healthId = "";
    
    static func ==(lhs: AvailableUsers, rhs: AvailableUsers) -> Bool {
            return lhs.healthId == rhs.healthId
        }

        func hash(into hasher: inout Hasher) {
            hasher.combine(healthId)
        }
    
    static var Users: [AvailableUsers] = [
        
        
         AvailableUsers(name: "Ditte Weitzenböck", healthId: "P179293935"),
                  AvailableUsers(name: "Jenni van der Berge", healthId: "D700912919"),
                  AvailableUsers(name: "Karyn Friderich", healthId: "R302790016"),
                  AvailableUsers(name: "Trajan Jammal", healthId: "Q182922837"),
                  AvailableUsers(name: "Kim Hölder", healthId: "V093547110"),
                  AvailableUsers(name: "Antje Dürrwächter", healthId: "C281555914"),
                  AvailableUsers(name: "Dorine Erner", healthId: "B055779705"),
                  AvailableUsers(name: "Mohammed Dominé", healthId: "Q166734172"),
                  AvailableUsers(name: "Edmund Moning", healthId: "G443503373"),
                  AvailableUsers(name: "Ulrike Eliane Ransbach", healthId: "V244746635"),
                  AvailableUsers(name: "Charlotta Lattuada", healthId: "I467763424"),
                  AvailableUsers(name: "Fiorina Friederici", healthId: "U449298563"),
                  AvailableUsers(name: "Metin Urfer", healthId: "S382572116"),
                  AvailableUsers(name: "Claudius Höttl", healthId: "N040297356"),
                  AvailableUsers(name: "Toussaint Wieluch", healthId: "K426342988"),
                  AvailableUsers(name: "Nola Sklenar", healthId: "Q540409950"),
                  AvailableUsers(name: "Alanis Bárbara Blübaum", healthId: "H981445495"),
                  AvailableUsers(name: "Filomena Obermöller", healthId: "V251504960"),
                  AvailableUsers(name: "Karl-August Oehmen", healthId: "W215342166"),
                  AvailableUsers(name: "Liva Lubitsch", healthId: "G049950594"),
                  AvailableUsers(name: "Peter-Heinz Matthaei", healthId: "P902003565"),
                  AvailableUsers(name: "Olcay Kilian Mazingu", healthId: "V302252880"),
                  AvailableUsers(name: "Ferdinande Castan", healthId: "V201219304"),
                  AvailableUsers(name: "Valer Klaschka", healthId: "P815185267"),
                  AvailableUsers(name: "Addi Gürschner", healthId: "C420797644"),
                  AvailableUsers(name: "Dietmar-Maria Budař", healthId: "Y587922237"),
                  AvailableUsers(name: "Eugenius Reuth", healthId: "F775922314"),
                  AvailableUsers(name: "Bertrand von dem Busche", healthId: "A100194532"),
                  AvailableUsers(name: "Adelajda Fedel", healthId: "V505397572"),
                  AvailableUsers(name: "Anniko Lorch", healthId: "E486966747"),
                  AvailableUsers(name: "Hannah-Lene Gottschlag", healthId: "H697855490"),
                  AvailableUsers(name: "İlkay Paul-Henri Steinhaeusser", healthId: "Q667805971"),
                  AvailableUsers(name: "Johann Peter Abramowitsch", healthId: "V641677631"),
                  AvailableUsers(name: "Vitalis Erdle", healthId: "P013510749"),
                  AvailableUsers(name: "Benedict Wansing", healthId: "S453483601"),
                  AvailableUsers(name: "Dieprand Edwards", healthId: "I717558212"),
                  AvailableUsers(name: "James Eschebach", healthId: "H326802335"),
                  AvailableUsers(name: "Gunna Tatge", healthId: "L338249596"),
                  AvailableUsers(name: "Damaris R. Labbadia", healthId: "B682829226"),
                  AvailableUsers(name: "Marguerite Ambacher", healthId: "Q952468482"),
                  AvailableUsers(name: "Fridtjof Schrader", healthId: "H898891259"),
                  AvailableUsers(name: "Berchtold Görtz-Wrisberg", healthId: "J671009960"),
                  AvailableUsers(name: "Vitaly Zeitlhofer", healthId: "P262640443"),
                  AvailableUsers(name: "Göran Kreppel", healthId: "F173976800"),
                  AvailableUsers(name: "Loraine Jaks", healthId: "Z082897408"),
                  AvailableUsers(name: "Eren Krückels", healthId: "Y562679679"),
                  AvailableUsers(name: "Marielle Raffington", healthId: "I669655261"),
                  AvailableUsers(name: "Eniola Opocensky", healthId: "T957299849"),
                  AvailableUsers(name: "Beat Bourbon", healthId: "T647210096"),
                  AvailableUsers(name: "Yannick Mederow", healthId: "Z991878026"),
                  AvailableUsers(name: "Joris Eidams", healthId: "P465620101"),
                  AvailableUsers(name: "Annalise Baeyer", healthId: "Y279331465"),
                  AvailableUsers(name: "Sébastien Zinner", healthId: "J828745426"),
                  AvailableUsers(name: "Tanya Zade", healthId: "X109219665"),
                  AvailableUsers(name: "Kreszentia Tramp", healthId: "W407506186"),
                  AvailableUsers(name: "Kerstin Dincer", healthId: "Y878467646"),
                  AvailableUsers(name: "Thorn Schetelich", healthId: "Y140780380"),
                  AvailableUsers(name: "Roswitha Feldmüller", healthId: "B607260519"),
                  AvailableUsers(name: "Sandeep Keuning", healthId: "J023079864"),
                  AvailableUsers(name: "Mimi Zähler", healthId: "U775088890"),
                  AvailableUsers(name: "S. Neda Edmond", healthId: "K415576841"),
                  AvailableUsers(name: "Anton Winch", healthId: "W767484198"),
                  AvailableUsers(name: "Flockina Klüwer", healthId: "R393432004"),
                  AvailableUsers(name: "Joe Scharfenorth", healthId: "E713244682"),
                  AvailableUsers(name: "Pál Koke", healthId: "T592799570"),
                  AvailableUsers(name: "Farah Anding", healthId: "L102540839"),
                  AvailableUsers(name: "Hiếu Breitschuh", healthId: "W425928742"),
                  AvailableUsers(name: "Szymon Hollwitz", healthId: "E148859906"),
                  AvailableUsers(name: "Kristina Hohoff", healthId: "C638490876"),
                  AvailableUsers(name: "Cerstin von Brandenstein", healthId: "V011369855"),
                  AvailableUsers(name: "Jan Kaempfer", healthId: "L066580827"),
                  AvailableUsers(name: "Ricki Braunbeck", healthId: "Z176485411"),
                  AvailableUsers(name: "Laurence Furkel", healthId: "H398359331"),
                  AvailableUsers(name: "Massimiliano Wessinghage", healthId: "K162056938"),
                  AvailableUsers(name: "Margarita Schwentke", healthId: "D511048530"),
                  AvailableUsers(name: "Nick Mross", healthId: "T760585825"),
                  AvailableUsers(name: "Celestyn Schickinger", healthId: "M651641450"),
                  AvailableUsers(name: "Burim Geizkofler", healthId: "V681583552"),
                  AvailableUsers(name: "Juan Sebastián Kijewski", healthId: "E989497319"),
                  AvailableUsers(name: "Carola Stendel", healthId: "X243401984"),
                  AvailableUsers(name: "Janina Blaum", healthId: "F635889268"),
                  AvailableUsers(name: "Magda Cain", healthId: "F553092323"),
                  AvailableUsers(name: "Ernie Eickelberg", healthId: "V543033396"),
                  AvailableUsers(name: "Jules Seeckt", healthId: "G839948921"),
                  AvailableUsers(name: "Thankmar Niggeloh", healthId: "R750102860"),
                  AvailableUsers(name: "Lipót Wehrenberg", healthId: "I787698582"),
                  AvailableUsers(name: "Zofia Geers", healthId: "J817104093"),
                  AvailableUsers(name: "Scarlet Monika Fauth", healthId: "B622820700"),
                  AvailableUsers(name: "Hildur Fürsich", healthId: "O018753329"),
                  AvailableUsers(name: "Yaroslav Passy", healthId: "H253024330"),
                  AvailableUsers(name: "Paul-Werner Aslan Börner", healthId: "Y581099432"),
                  AvailableUsers(name: "Margriet Hitzing", healthId: "Z129727266"),
                  AvailableUsers(name: "Iradj von Hattstein", healthId: "E970401241"),
                  AvailableUsers(name: "Kay Kalt", healthId: "N450568028"),
                  AvailableUsers(name: "Axel Wilhelm Raimund Uhlenberg", healthId: "O556653626"),
                  AvailableUsers(name: "Imagina Handt", healthId: "D162565246"),
                  AvailableUsers(name: "Phylicia Roedelheim", healthId: "I840077700"),
                  AvailableUsers(name: "Eileen Dettmers", healthId: "I000685456"),
                  AvailableUsers(name: "Nanette Berkemeier", healthId: "O384255999"),
                  AvailableUsers(name: "Kübra Brockdorff", healthId: "O354567460"),
         AvailableUsers(name: "Darius Michael Brian Ubbo Graf von Bödefeld", healthId: "X110411675"),
    ]
    
}
