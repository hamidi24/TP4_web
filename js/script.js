console.log("Je suis la console ! ");
function quizAlert() {
    alert("Vous êtes sur le point de commencer le quiz !");
    quizConfirm();
}
function quizConfirm() {
    //tester si les champs ont été remplis
    //si oui, afficher un message de confirmation
    //si non, afficher un message d'erreur
    var nom = document.getElementById("nom").value;
    var prenom = document.getElementById("prenom").value;
    //date_naissance
    var date_naissance = document.getElementById("date_naissance").value;
    var email = document.getElementById("mail").value;
    //tester si les champs sont vides
    if (nom === "" || prenom === "" || date_naissance === "" || email === "") {
        alert("Veuillez remplir tous les champs !");
    } else {    
        var res = confirm("Etes-vous sûr de vouloir continuer ?");
        if (res == true) {
            alert("Le quiz va commencer dans 5 secondes !");
            //cacher le bouton de démarrage
            document.getElementById("startQuiz").style.display = "none";
            //désactivez la saisie au niveau du fieldset « informations », les champs d'id nom, prenom, date_naissance et mail*
            document.getElementById("informations").disabled = true;

            //ajouter un décompte de 5 secondes
            var timer = 5;
            //Créer un élément p pour afficher le message
            var confirmation = document.createElement("p");
            confirmation.textContent = timer + " secondes";
            //style du message
            confirmation.style.color = "red";
            confirmation.style.fontSize = "1.5em";
            confirmation.style.fontWeight = "bold";
            confirmation.style.textAlign = "center";
            //ajouter le message à la pagie à la suite du bouton d'id start
            var start = document.getElementById("informations");
            start.appendChild(confirmation);
            //en utilisant la fonction setInterval qui s'exécute toutes les secondes
            var interval = setInterval(function () {
            //décrémenter le décompte
                timer--;
            //On l’affiche également dans la console
                console.log(timer);
                //afficher le décompte dans l’élément p créé
                confirmation.textContent = timer + " secondes";
                //si le décompte est terminé
                //afficher le message "C'est parti ! Bonne chance !"
                //afficher le formulaire
                //afficher le bouton de soumission
                if (timer == 0) {
                    clearInterval(interval);
                    confirmation.textContent = "C'est parti ! Bonne chance !";
                    document.getElementsByClassName("quiz")[0].style.display = "block";
                    document.getElementsByTagName("button")[0].style.display = "block";
                }
                
            }, 1000);
      
        } else {
            alert("Vous allez être redirigé vers la page d'accueil !");
            window.location.href = "accueil.html";
        }
    }
}

function submitQuiz() {
    let score = 0;
    let reponses_q1 = document.querySelectorAll("input[type=radio]:checked");
    let reponses_q2 = document.querySelectorAll("input[type=checkbox]:checked");
    let reponse = document.getElementById("q3").value;
    if (reponses_q1.length === 0 || reponses_q2.length === 0 || reponse === "") {
        alert("Veuillez répondre à toutes les questions !");
    }
    else{
        for (let i = 0; i < reponses_q1.length; i++) {
            if (reponses_q1[i].value === "a") {
                score += 4;
            }
        }
        for (let i = 0; i < reponses_q2.length; i++) {
            if (reponses_q2[i].value === "a" || reponses_q2[i].value === "b") {
                score += 3;
            }
            else if (reponses_q2[i].value === "c") {
                score -= 3;
            }
        }
        
        //la réponse doit contenir l'un des mots : réduire, alléger, faciliter, optimiser, exploiter
        //mettre au minisucule
        reponse = reponse.toLowerCase();
        if (reponse.includes("réduire") || reponse.includes("alléger") || reponse.includes("faciliter") || reponse.includes("optimiser") || reponse.includes("exploiter")) {
            score += 10;
        }
        let tbody = document.querySelector("#result tbody");
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        td.textContent = document.querySelectorAll("#result tbody tr").length + 1;
        tr.appendChild(td);
        td = document.createElement("td");
        td.textContent = score;
        tr.appendChild(td);
        tbody.appendChild(tr);
        
    }    
}

