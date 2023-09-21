# BOOMI API REQUEST SENDER FUNCTION

---

# PROBLEM
 
 La API del BOOMI non riesce a mandare i richieste dei ordine piu da 1000 a volta

--- 

# SOLUTION

Divendare il numero totale dei richieste a messa nella lista di richiesti, e mandare solamente messa di richieste in ogni singola chiamata alla API, quindi il numero dei richieste decresce eventualmente subito e ci da la performance mentre ci mette in posizione di mandare tutti i richieste senza problema che la feature di BOOMI ci ha creato.

---

# CONCLUSION

La funzionalita e implementato con un singola locale funziona, Totale run-time complessita della funziona e O(2), ma obbivio che questo non e un problema, nel senso che il numero totale dei elementi gradualmente decresce a messa, e questo ci da la possibilita do avere la performance.

La chiamte a API e designato a fare con la differenza del tempo che dipende da numero totale dei elementi nella lista di richiesti, e questa crea la possibilita di mandare tutti i richieste senza problema, e anche il tempo totale neccesario per aspettare gradualmente decresce dipende dalle decresita in numero totale dei richieste nella lista dei richiesti.# deloitte-boomi-api-project
