

![🎱](data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==)![🎱](https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f3b1.svg)

L’istituto di astrofisica
=========================







![🧑🏻‍💻](data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==)

La solita dovuta raccomandazione: prima di procedere con l’esercizio considera di concederti qualche momento in più per analizzare la richiesta; l’obiettivo non è completare l’esercizio entro il limite di consegna ma mostrare spirito critico, applicazione delle “best practice”, conoscenza dei pattern e adattamento. I dettagli faranno la differenza ![🙂](data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==)​

#### Traccia

L’istituto di astrofisica deve tenere traccia delle osservazioni astronomiche effettuate dal proprio gruppo di ricerca. Ci è stato commissionato un form di registrazione che presenta i seguenti vincoli:

Nella schermata del form, un input di tipo selector permette l’individuazione del corpo celeste fornendo le seguenti opzioni: pianeta, stella, asteroide, meteora, U.F.O.

La precedente selezione determina quali altri campi dovranno essere mostrati all’interno del form ([v. tabella](/936cfbdfe2164a6e9c89b7b3f58f1dbb?pvs=25#b910384d9c76475a895a89947f9f1999));

L’input iniziale e quelli visualizzati in seguito alla selezione fanno parte di un unico form;

Tutti i campi devono essere validati durante la digitazione ([v. tabella](/936cfbdfe2164a6e9c89b7b3f58f1dbb?pvs=25#ade73229c1f7413093ff4182ae53e4ca));

Il campo “sistema solare” indica l’appartenenza del corpo al sistema solare; nel caso in cui la distanza di questo dal sole sia maggiore di 130 UA, l’oggetto si considera convenzionalmente “fuori” dal sistema solare per questo motivo è necessario che i campi non si contraddicano;

A seguito del click sul tasto “invia”, una dialog conferma all’utente il corretto inoltro del dati;

#### Bonus quest

Una pagina di monitoraggio contenente la lista di oggetti catalogati, che permetta di modificare ed eliminare le registrazioni effettuate dall’utente in sessione (consiglio: simula un database front end utilizzando la libreria RxJs e verifica la semplice corrispondenza tra l’id dell’utente in “sessione” e l’id dell’autore)

I designer ci hanno proposto un layout alternativo: l’utente è in grado di scegliere se esprimere le coordinate tramite angolo orario oppure ascensione retta. Il design prevede che un unico input presenti sia un’area di inserimento testo che un area di selezione a tendina. Il menu a tendina permette di scegliere l’unità di misura (h/°); il campo di testo permette di inserire un numero da 0 a 360 per l’angolo orario e le coordinate orarie nel formato hh.mm.ss per l’ascensione retta. Requisiti specifici:

il campo di testo e la select devono formare un unico input riutilizzabile (non lavorare solo con l’html e lo stile, ma utilizza l’interfaccia fornita da Angular per creare input custom)

la validazione deve considerarlo come unico input

![](/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F34db648b-a762-4f77-ad9d-e828861ace27%2Fcb6cb0cd-b418-4f3d-b470-e1b573ef4288%2FScreenshot_2023-11-17_alle_12.11.33.png?table=block&id=f89c54b1-f293-425c-99f7-f69cc0a7e797&spaceId=34db648b-a762-4f77-ad9d-e828861ace27&width=2000&userId=&cache=v2)



