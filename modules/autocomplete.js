const stopInput = document.querySelector(".stop-input");
const submitButton = document.querySelector(".submit-button");

function autocomplete(input, array) {
  let currentFocus;
  input.addEventListener("input", function (e) {
    let list,
      line,
      i,
      val = this.value;
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    list = document.createElement("DIV");
    list.setAttribute("id", this.id + "autocomplete-list");
    list.setAttribute("class", "autocomplete-items");
    this.parentNode.appendChild(list);
    for (i = 0; i < array.length; i++) {
      if (
        latinize(array[i].substr(0, val.length).toUpperCase()) ==
        latinize(val.toUpperCase())
      ) {
        line = document.createElement("DIV");
        line.innerHTML =
          "<strong>" + array[i].substr(0, val.length) + "</strong>";
        line.innerHTML += array[i].substr(val.length);
        line.innerHTML += "<input type='hidden' value='" + array[i] + "'>";
        line.addEventListener("click", function (e) {
          input.value = this.getElementsByTagName("input")[0].value;
          submitButton.click();
          closeAllLists();
        });
        list.appendChild(line);
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  input.addEventListener("keydown", function (e) {
    let listIndex = document.getElementById(this.id + "autocomplete-list");
    if (listIndex) listIndex = listIndex.getElementsByTagName("div");
    if (e.keyCode == 40) {
      currentFocus++;
      addActive(listIndex);
    } else if (e.keyCode == 38) {
      currentFocus--;
      addActive(listIndex);
    } else if (e.keyCode == 13) {
      if (currentFocus > -1) {
        if (listIndex) listIndex[currentFocus].click();
      }
    }
  });

  /*a function to classify an item as "active":*/
  function addActive(listIndex) {
    if (!listIndex) return false;
    removeActive(listIndex);
    if (currentFocus >= listIndex.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = listIndex.length - 1;
    listIndex[currentFocus].classList.add("autocomplete-active");
  }

  /*a function to remove the "active" class from all autocomplete items:*/
  function removeActive(listIndex) {
    for (let i = 0; i < listIndex.length; i++) {
      listIndex[i].classList.remove("autocomplete-active");
    }
  }

  /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
  function closeAllLists(element) {
    let items = document.getElementsByClassName("autocomplete-items");
    for (let i = 0; i < items.length; i++) {
      if (element != items[i] && element != input) {
        items[i].parentNode.removeChild(items[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

const busStops = [
  "1 Maja",
  "23 Marca",
  "3 Maja",
  "49 Baza Lotnicza",
  "Abrahama",
  "Aeroklub Gdański",
  "Agrarna",
  "Akademia Muzyczna",
  "Aksamitna",
  "Andruszkiewicza",
  "Anyżowa",
  "Archikatedra Oliwska",
  "Astronautów",
  "Azaliowa",
  "Bajana",
  "Bajki",
  "Barniewicka",
  "Bartnicza",
  "Batalionów Chłopskich",
  "Baza Hallera",
  "Baza Manipulacyjna",
  "Baśniowa",
  "Bażyńskiego",
  "Belgradzka",
  "Bema",
  "Beniowskiego",
  "Benzynowa",
  "Biała",
  "Biały Dwór",
  "Biblioteka Główna UG",
  "Bitwy pod Płowcami",
  "Biwakowa",
  "Bobrowa",
  "Bogatka I",
  "Bogatka II",
  "Bogatka III",
  "Boguckiego",
  "Bohaterów Monte Cassino",
  "Bora Komorowskiego",
  "Borowiecka",
  "Brama Nizinna",
  "Brama Oliwska",
  "Brama Oruńska",
  "Brama Wyżynna",
  "Brama Żuławska",
  "Bratki",
  "Brodwino",
  "Brodwino Szkoła",
  "Broniewskiego",
  "Brzegowa",
  "Brzeźno",
  "Brętowo PKM",
  "Budapesztańska",
  "Budzysza",
  "Bursztynowa",
  "Bysewo",
  "Błonia",
  "Cebertowicza",
  "Centrostal",
  "Centrum Medycyny Inwazyjnej",
  "Centrum Nadawcze RTV",
  "Centrum Onkologii",
  "Charpentiera",
  "Chałubińskiego",
  "Chełm Cienista",
  "Chełm Witosa",
  "Chmielna",
  "Chodowieckiego",
  "Chopina",
  "Chrobrego",
  "Chrzanowskiego",
  "Chwaszczyno",
  "Chłodna",
  "Chłopska",
  "Ciasna",
  "Cicha (Cmentarz)",
  "Cieszyńskiego",
  "Ciołkowskiego",
  "Cmentarz Oliwski",
  "Cmentarz Srebrzysko",
  "Cmentarz Łostowicki",
  "Cygańska Góra",
  "Cyprysowa",
  "Cystersów",
  "Czarny Dwór",
  "Czermińskiego",
  "Czerwony Dwór",
  "Czyżewskiego",
  "Damroki",
  "De Plelo",
  "Derdowskiego",
  "Dickensa",
  "Do Zdroju",
  "Dobra",
  "Dobrowo",
  "Dobrowolskiego",
  "Dolna",
  "Dolne Młyny",
  "Dom Pomocy Społecznej",
  "Droszyńskiego",
  "Drwęcka (n/ż)",
  "Drzewieckiego",
  "Drzymały",
  "Dworkowa",
  "Dworska",
  "Dworzec Główny",
  "Dwór Ferberów",
  "Dywizjonu 303",
  "Dziewicza",
  "Dąbrowa Centrum",
  "Długie Ogrody",
  "Elbląska",
  "Elfów",
  "Emaus",
  "Emilii Plater",
  "Fabryczna",
  "Fabryczny",
  "Faktoria",
  "Falista",
  "Falowa",
  "Firoga",
  "Focha",
  "Forsycji",
  "Galeria Bałtycka",
  "Gdańska",
  "Gdyńska",
  "Geodetów",
  "Giełda Towarowa",
  "Gospody",
  "Gostyńska Szpital",
  "Goyki",
  "Gościnna",
  "Grabowskiego",
  "Grand Hotel",
  "Gronostajowa",
  "Grudziądzka",
  "Grunwaldzka",
  "Góralska",
  "Górecka",
  "Górki Wschodnie",
  "Górki Zachodnie",
  "Górskiego",
  "Gęsia",
  "Głucha",
  "Głęboka",
  'Hala "Olivia"',
  "Harfowa",
  "Helska",
  "Hestii",
  "Hevelianum",
  "Hokejowa",
  "Hospicjum",
  'Hotel "Marina"',
  "Hucisko",
  "Hynka",
  "Ikara",
  "Instal",
  "Inżynierska",
  "Iławska",
  "Jabłoniowa Osiedle",
  "Jagiellońska",
  "Jagiełły",
  "Jana Pawła II",
  "Jana z Kolna",
  "Jankowo",
  "Jarowa",
  "Jasia i Małgosi",
  "Jasień Działki",
  "Jasień PKM",
  "Jasień Pólnicy",
  "Jasieńska",
  "Jaworowa",
  "Jaworzniaków",
  "Jaśkowa Dolina",
  "Jednorożca",
  "Jeleniogórska",
  "Jelitkowo",
  "Jelitkowo Kapliczna",
  "Jesionowa",
  "Jeziorowa",
  "Jodowa",
  "Junaków",
  "Kaczeńce",
  "Kaczeńce - Sienna",
  "Kameliowa",
  "Kamienna Grobla",
  "Kamienny Potok SKM",
  "Kampinoska",
  "Kanałowa",
  "Karczemki",
  "Karskiego",
  "Kartuska",
  "Karwieńska",
  "Karwiny PKM",
  "Karwiny Tesco",
  "Kasztanowa",
  "Kasztelańska",
  "Kempingowa",
  "Keplera",
  "Kielecka",
  "Kiełpino - Szkoła",
  "Kiełpino Górne",
  "Kilińskiego",
  "Kliniczna",
  "Klonowa",
  "Klonowicza",
  "Knyszyńska",
  "Kochanowskiego",
  "Kokoszki",
  "Kokoszki - Poczta",
  "Kolberga",
  "Kolonia Mysia",
  "Kolonia Uroda",
  "Kolorowa",
  "Kolumba",
  "Komarowo",
  "Konkordii",
  "Kontenerowa",
  "Kopalniana",
  "Korczaka",
  "Korty Tenisowe",
  "Kosmonautów",
  "Koziorożca",
  "Kołobrzeska",
  "Kościuszki",
  "Krasickiego",
  "Kraszewskiego",
  "Krynicka",
  "Krzemowa",
  "Królewskie Wzgórze",
  "Kręta",
  "Ku Ujściu",
  "Kujawska",
  "Kurpińskiego",
  "Kwiatowa",
  "Kępna",
  "Kłosowa",
  "Latarnia Morska",
  "Lawendowe Wzgórze",
  "Lazurowa",
  "Legionów",
  "Lenartowicza",
  "Lessowa",
  "Leszczynowa",
  "Leszczyńskich",
  "Leśna Góra",
  "Leśna Góra - Przychodnia",
  "Liliowa",
  "Lipowa",
  "Lipuska",
  "Lubowidzka",
  "Lwowska",
  "Maki",
  "Malczewskiego",
  "Marsa",
  "Marynarki Polskiej",
  "Matarnia PKM",
  "Matejki",
  "Matemblewo",
  "Mazurska",
  "Maćkowy",
  "Małomiejska",
  "Małopolska",
  "Meczet",
  "Meissnera",
  "Meteorytowa",
  "Miałki Szlak",
  "Michałki",
  "Mickiewicza",
  "Migowo",
  "Miszewskiego",
  "Mjr Hubala",
  "Mjr Słabego",
  "Modra I",
  "Modra II",
  "Modra III",
  "Modra IV",
  "Mostek",
  "Mostostal",
  "Mostowa",
  "Muzeum II Wojny Światowej",
  "Muzeum Narodowe",
  "Myśliborska",
  "Myśliwska",
  "Młyńska",
  "Na Szańcach",
  "Na Wzgórzu",
  "Na Zaspę",
  "Nad Jarem",
  "Nad Stawem",
  "Nadwiślańska",
  "Nadwodna",
  "Naftowa",
  "Nałkowskiej",
  "Niedziałkowskiego",
  "Niedźwiednik",
  "Niegowska",
  "Niemcewicza",
  "Niepołomicka",
  "Norblina",
  "Nowa",
  "Nowa Gdańska",
  "Nowatorów",
  "Nowiny",
  "Nowolipie",
  "Nowowiejskiego",
  "Nowy Port Góreckiego",
  "Nowy Port Oliwska",
  "Nowy Port Szaniec Zachodni",
  "Nowy Port Zajezdnia",
  "Nowy Świat",
  "Obrońców Westerplatte",
  "Obrońców Wybrzeża",
  "Oczyszczalnia",
  "Odrzańska",
  "Ogrodowa",
  'Ogrody Działkowe "Rębiechowo" I',
  'Ogrody Działkowe "Rębiechowo" II',
  'Ogrody Działkowe "Rębiechowo" III',
  "Okopowa",
  "Okrężna",
  "Olimpijska",
  "Oliwa",
  "Oliwa PKP",
  "Oliwa Pętla Tramwajowa",
  "Oliwa ZOO",
  "Oliwska",
  "Olsztyńska",
  "Olszynka - Niwki",
  "Olszynka - Szkoła",
  "Olszyńska",
  "Opacka",
  "Opera Bałtycka",
  "Opolska",
  "Oriona",
  "Orlinki",
  "Ornitologów",
  "Orunia Górna",
  "Osiedle Bursztynowe",
  "Osiedle Cytrusowe",
  "Osiedle Jary",
  "Osiedle Kasprowicza",
  "Osiedle Olimp",
  "Osiedle Piastowskie",
  "Osiedle Wejhera",
  "Osiedle Wschód",
  "Osiedle Świętokrzyskie",
  "Osowa Obwodnica",
  "Osowa PKP",
  "Osowa Przesypownia",
  "Ostroroga",
  "Ostróżek",
  "Otomin - Pętla",
  "Otomińska",
  "Otwarta",
  "Owczarnia",
  "PCK",
  "Pagórkowa",
  "Paprykowa",
  "Park Naukowo - Technologiczny",
  "Park Reagana",
  "Paska",
  "Pastelowa",
  "Piaskowa",
  "Piastowska",
  "Piecewska",
  "Piekarnicza",
  "Pilotów",
  "Piotrkowska",
  "Plac Afrodyty",
  "Plac Komorowskiego",
  "Plac Kusocińskiego",
  "Plac Solidarności",
  "Plac Wolności",
  "Platynowa",
  "Pocztowa",
  "Podkarpacka",
  "Pogotowie Ratunkowe",
  "Pohulanka",
  "Pokładowa",
  "Pole Namiotowe",
  "Politechnika",
  "Polna",
  "Pomorska",
  "Pomorska - Osiedle",
  "Pomorskie Szkoły Rzemiosł",
  "Port Lotniczy",
  "Porębskiego",
  "Potokowa",
  "Potokowa - Matemblewska",
  "Potęgowska",
  "Powstańców Warszawskich",
  "Powstańców Warszawy",
  "Poznańska",
  "Przebiśniegowa",
  "Przegalina",
  "Przegalińska",
  "Przejazd Kolejowy",
  "Przemian",
  "Przemyska",
  "Przemysłowa",
  "Przeróbka",
  "Przesypownia",
  "Przetoczna",
  "Przybrzeżna",
  "Przychodnia",
  "Przylesie",
  "Przymorze SKM",
  "Przymorze Wielkie",
  "Przyrodników",
  "Przystań",
  "Przystań Żeglugi",
  "Przytulna",
  "Przywidzka",
  "Pszenna",
  "Ptasia",
  "Pólnicy",
  "Płocka",
  "Płowce",
  "Płońska",
  "Radarowa",
  "Radiowa",
  "Radunica",
  "Rafineria",
  "Rakietowa",
  "Rdestowa - Chwaszczyńska",
  "Rdestowa - Leśny Zakątek",
  "Reja",
  "Rejtana",
  "Reymonta",
  "Rogalińska",
  "Rogozińskiego",
  "Rondo Bursztynowe",
  "Rondo Kaszubskie",
  "Rondo Kociewskie",
  "Rotmanka - Rondo",
  "Rozstaje",
  "Rozłogi",
  "Rybacka",
  "Rybaki Górne",
  "Rybołowców",
  "Rynarzewo",
  "Rzeczypospolitej",
  "Rzeźnicka",
  "Równa",
  "Rębiechowo PKP",
  "Rębowo",
  'SDO "Złota Jesień"',
  'Sanatorium "Leśnik"',
  "Sandomierska",
  "Sarnia",
  'Schronisko dla zwierząt "Promyk"',
  "Schuberta",
  "Schumana",
  "Sezonowa",
  "Siedlce",
  "Siedlicka",
  "Sienkiewicza",
  "Siennicka",
  "Sierpowa",
  "Sikorskiego",
  "Skarżyńskiego",
  "Skrajna",
  "Smolna",
  "Smoluchowskiego",
  "Sobieszewo",
  "Sobieszewska",
  "Sobótki",
  "Sopocka",
  "Sopot PKP",
  "Sopot PKP - Marynarzy",
  "Sopot PKP - Niepodległości",
  "Spadochroniarzy",
  "Sportowa",
  "Srebrna",
  "Stadion",
  "Stadion Energa Gdańsk",
  "Stara Piła",
  "Stare Szkoty",
  "Starochwaszczyńska",
  "Starogardzka",
  "Starowiejska",
  "Startowa",
  "Staw Wróbla",
  "Steczka",
  "Sternicza",
  "Stocznia Północna",
  "Stocznia SKM",
  "Stogi",
  "Stogi Plaża",
  "Stokrotki",
  "Stolema",
  "Strzelnica",
  "Strzyża PKM",
  "Stężycka",
  "Subisława",
  "Suchanino",
  "Sucharskiego",
  "Sucharskiego - PKP",
  "Sulmin",
  "Sulmińska",
  "Swojska",
  "Szadółki",
  "Szadółki Obwodnica",
  "Szafranowa",
  "Szczęśliwa",
  "Szkolna",
  "Szkoła",
  "Szkoła Metropolitalna",
  "Szkoła Podstawowa nr 6",
  "Szlachecka",
  "Szmaragdowa",
  "Szpital Marynarki Wojennej",
  "Szpital Zakaźny",
  "Sztutowska",
  "Szybowcowa",
  "Sówki",
  "Sąsiedzka",
  "Słowackiego",
  "Słowackiego Działki",
  "Tarcice",
  "Teatr Miniatura / Radio Gdańsk",
  "Telewizyjna",
  "Terminal - Cargo",
  "Terminal DCT",
  "Tetmajera",
  "Topazowa",
  "Toruńska",
  "Trakt Gdański",
  "Trakt Konny",
  "Transportowców",
  "Traugutta",
  "Trawki",
  "Trałowa - Szkoła",
  "Turystyczna",
  "Twarda",
  "Twierdza Wisłoujście",
  "Tysiąclecia",
  "Tęczowa",
  "Uczniowska",
  "Ujeścisko",
  "Ukośna",
  "Unimor",
  "Uniwersyteckie Centrum Kliniczne",
  "Uniwersytet Gdański",
  "Uniwersytet Medyczny",
  "Uphagena",
  "Uranowa",
  "Urząd Dozoru Technicznego",
  "Urząd Miejski",
  "Urząd Skarbowy",
  "Uzdrowiskowa",
  "Wagnera",
  "Waląga",
  "Warneńska",
  "Wały Piastowskie",
  "Wały Piastowskie ",
  "Wczasy",
  "Westerplatte",
  "Wiczlińska",
  "Wiejska",
  "Wieżycka",
  "Wilanowska",
  "Wileńska",
  "Wiśniewskiego",
  "Wodnika",
  "Wojska Polskiego",
  "Worcella",
  "Wołkowyska",
  "Wrzeszcz PKP",
  "Wrzosowe Wzgórze",
  "Wróbla",
  "Wybickiego",
  "Wyczółkowskiego",
  "Wysockiego",
  "Wyspiańskiego",
  "Wyzwolenia",
  "Węgorzowa",
  "Węzeł Elbląska",
  "Węzeł Groddecka",
  "Węzeł Karczemki",
  "Węzeł Kliniczna",
  "Węzeł Lipce",
  "Władysława IV",
  "Zabornia",
  "Zabytkowa",
  "Zacna",
  "Zagroble",
  "Zajezdnia",
  "Zajezdnia NOWY PORT",
  "Zajezdnia WRZESZCZ",
  "Zakoniczyn",
  "Zakopiańska",
  "Zamenhofa",
  "Zaspa",
  "Zaspa - Szpital",
  "Zaspa SKM",
  "Zastawna",
  "Zawodzie",
  "Zbieżna",
  "Zespół Szkół Morskich",
  "Zeusa",
  "Zielony Stok",
  "Zimna",
  "Zwierzyniecka",
  "Złota Karczma",
  "al. Płażyńskiego",
  "Łabędzia",
  "Łagiewniki",
  "Łanowa I",
  "Łanowa II",
  "Łanowa III",
  "Łanowa IV",
  "Łapińska",
  "Łostowice Świętokrzyska",
  "Łowicka",
  "Łódzka",
  "Łąkowa",
  "Łęczycka",
  "Śnieżna",
  "Śródmieście SKM",
  "Św. Wojciech",
  "Świbnieńska I",
  "Świbnieńska II",
  "Świbnieńska III",
  "Świętokrzyska",
  "Źródlana",
  "Źródło Marii",
  "Żabi Kruk",
  "Żabianka SKM",
  "Żaglowa - AmberExpo",
  "Żarnowiecka",
  "Żwirki i Wigury",
  "Życzliwa",
];

autocomplete(stopInput, busStops);
