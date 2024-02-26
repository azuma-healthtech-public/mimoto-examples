package com.mimoto.example.gematikmock.data;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public final class Constants {
    public final static List<AvailableUser> AVAILABLE_USERS;
    public final static List<String> AVAILABLE_SCOPE_DECLINES;
    public final static int DEFAULT_USER_INDEX;

    static {
        AVAILABLE_SCOPE_DECLINES = new ArrayList<String>();
        AVAILABLE_SCOPE_DECLINES.add("Remove claims");
        AVAILABLE_SCOPE_DECLINES.add("Add empty claims");

        List<AvailableUser> users = new ArrayList<AvailableUser>();
        users.add(new AvailableUser("Ditte Weitzenböck", "P179293935"));
        users.add(new AvailableUser("Jenni van der Berge", "D700912919"));
        users.add(new AvailableUser("Karyn Friderich", "R302790016"));
        users.add(new AvailableUser("Trajan Jammal", "Q182922837"));
        users.add(new AvailableUser("Kim Hölder", "V093547110"));
        users.add(new AvailableUser("Antje Dürrwächter", "C281555914"));
        users.add(new AvailableUser("Dorine Erner", "B055779705"));
        users.add(new AvailableUser("Mohammed Dominé", "Q166734172"));
        users.add(new AvailableUser("Edmund Moning", "G443503373"));
        users.add(new AvailableUser("Ulrike Eliane Ransbach", "V244746635"));
        users.add(new AvailableUser("Charlotta Lattuada", "I467763424"));
        users.add(new AvailableUser("Fiorina Friederici", "U449298563"));
        users.add(new AvailableUser("Metin Urfer", "S382572116"));
        users.add(new AvailableUser("Claudius Höttl", "N040297356"));
        users.add(new AvailableUser("Toussaint Wieluch", "K426342988"));
        users.add(new AvailableUser("Nola Sklenar", "Q540409950"));
        users.add(new AvailableUser("Alanis Bárbara Blübaum", "H981445495"));
        users.add(new AvailableUser("Filomena Obermöller", "V251504960"));
        users.add(new AvailableUser("Karl-August Oehmen", "W215342166"));
        users.add(new AvailableUser("Liva Lubitsch", "G049950594"));
        users.add(new AvailableUser("Peter-Heinz Matthaei", "P902003565"));
        users.add(new AvailableUser("Olcay Kilian Mazingu", "V302252880"));
        users.add(new AvailableUser("Ferdinande Castan", "V201219304"));
        users.add(new AvailableUser("Valer Klaschka", "P815185267"));
        users.add(new AvailableUser("Addi Gürschner", "C420797644"));
        users.add(new AvailableUser("Dietmar-Maria Budař", "Y587922237"));
        users.add(new AvailableUser("Eugenius Reuth", "F775922314"));
        users.add(new AvailableUser("Bertrand von dem Busche", "A100194532"));
        users.add(new AvailableUser("Adelajda Fedel", "V505397572"));
        users.add(new AvailableUser("Anniko Lorch", "E486966747"));
        users.add(new AvailableUser("Hannah-Lene Gottschlag", "H697855490"));
        users.add(new AvailableUser("İlkay Paul-Henri Steinhaeusser", "Q667805971"));
        users.add(new AvailableUser("Johann Peter Abramowitsch", "V641677631"));
        users.add(new AvailableUser("Vitalis Erdle", "P013510749"));
        users.add(new AvailableUser("Benedict Wansing", "S453483601"));
        users.add(new AvailableUser("Dieprand Edwards", "I717558212"));
        users.add(new AvailableUser("James Eschebach", "H326802335"));
        users.add(new AvailableUser("Gunna Tatge", "L338249596"));
        users.add(new AvailableUser("Damaris R. Labbadia", "B682829226"));
        users.add(new AvailableUser("Marguerite Ambacher", "Q952468482"));
        users.add(new AvailableUser("Fridtjof Schrader", "H898891259"));
        users.add(new AvailableUser("Berchtold Görtz-Wrisberg", "J671009960"));
        users.add(new AvailableUser("Vitaly Zeitlhofer", "P262640443"));
        users.add(new AvailableUser("Göran Kreppel", "F173976800"));
        users.add(new AvailableUser("Loraine Jaks", "Z082897408"));
        users.add(new AvailableUser("Eren Krückels", "Y562679679"));
        users.add(new AvailableUser("Marielle Raffington", "I669655261"));
        users.add(new AvailableUser("Eniola Opocensky", "T957299849"));
        users.add(new AvailableUser("Beat Bourbon", "T647210096"));
        users.add(new AvailableUser("Yannick Mederow", "Z991878026"));
        users.add(new AvailableUser("Joris Eidams", "P465620101"));
        users.add(new AvailableUser("Annalise Baeyer", "Y279331465"));
        users.add(new AvailableUser("Sébastien Zinner", "J828745426"));
        users.add(new AvailableUser("Tanya Zade", "X109219665"));
        users.add(new AvailableUser("Kreszentia Tramp", "W407506186"));
        users.add(new AvailableUser("Kerstin Dincer", "Y878467646"));
        users.add(new AvailableUser("Thorn Schetelich", "Y140780380"));
        users.add(new AvailableUser("Roswitha Feldmüller", "B607260519"));
        users.add(new AvailableUser("Sandeep Keuning", "J023079864"));
        users.add(new AvailableUser("Mimi Zähler", "U775088890"));
        users.add(new AvailableUser("S. Neda Edmond", "K415576841"));
        users.add(new AvailableUser("Anton Winch", "W767484198"));
        users.add(new AvailableUser("Flockina Klüwer", "R393432004"));
        users.add(new AvailableUser("Joe Scharfenorth", "E713244682"));
        users.add(new AvailableUser("Pál Koke", "T592799570"));
        users.add(new AvailableUser("Farah Anding", "L102540839"));
        users.add(new AvailableUser("Hiếu Breitschuh", "W425928742"));
        users.add(new AvailableUser("Szymon Hollwitz", "E148859906"));
        users.add(new AvailableUser("Kristina Hohoff", "C638490876"));
        users.add(new AvailableUser("Cerstin von Brandenstein", "V011369855"));
        users.add(new AvailableUser("Jan Kaempfer", "L066580827"));
        users.add(new AvailableUser("Ricki Braunbeck", "Z176485411"));
        users.add(new AvailableUser("Laurence Furkel", "H398359331"));
        users.add(new AvailableUser("Massimiliano Wessinghage", "K162056938"));
        users.add(new AvailableUser("Margarita Schwentke", "D511048530"));
        users.add(new AvailableUser("Nick Mross", "T760585825"));
        users.add(new AvailableUser("Celestyn Schickinger", "M651641450"));
        users.add(new AvailableUser("Burim Geizkofler", "V681583552"));
        users.add(new AvailableUser("Juan Sebastián Kijewski", "E989497319"));
        users.add(new AvailableUser("Carola Stendel", "X243401984"));
        users.add(new AvailableUser("Janina Blaum", "F635889268"));
        users.add(new AvailableUser("Magda Cain", "F553092323"));
        users.add(new AvailableUser("Ernie Eickelberg", "V543033396"));
        users.add(new AvailableUser("Jules Seeckt", "G839948921"));
        users.add(new AvailableUser("Thankmar Niggeloh", "R750102860"));
        users.add(new AvailableUser("Lipót Wehrenberg", "I787698582"));
        users.add(new AvailableUser("Zofia Geers", "J817104093"));
        users.add(new AvailableUser("Scarlet Monika Fauth", "B622820700"));
        users.add(new AvailableUser("Hildur Fürsich", "O018753329"));
        users.add(new AvailableUser("Yaroslav Passy", "H253024330"));
        users.add(new AvailableUser("Paul-Werner Aslan Börner", "Y581099432"));
        users.add(new AvailableUser("Margriet Hitzing", "Z129727266"));
        users.add(new AvailableUser("Iradj von Hattstein", "E970401241"));
        users.add(new AvailableUser("Kay Kalt", "N450568028"));
        users.add(new AvailableUser("Axel Wilhelm Raimund Uhlenberg", "O556653626"));
        users.add(new AvailableUser("Imagina Handt", "D162565246"));
        users.add(new AvailableUser("Phylicia Roedelheim", "I840077700"));
        users.add(new AvailableUser("Eileen Dettmers", "I000685456"));
        users.add(new AvailableUser("Nanette Berkemeier", "O384255999"));
        users.add(new AvailableUser("Kübra Brockdorff", "O354567460"));

        AvailableUser defaultUser = new AvailableUser("Darius Michael Brian Ubbo Graf von Bödefeld", "X110411675");
        users.add(defaultUser);

        Collections.sort(users, new Comparator<AvailableUser>(){
            public int compare(AvailableUser obj1, AvailableUser obj2) {
                // ## Ascending order
                return obj1.getName().compareToIgnoreCase(obj2.getName());
            }
        });
        AVAILABLE_USERS = users;
        DEFAULT_USER_INDEX = users.indexOf(defaultUser);
    }
}
