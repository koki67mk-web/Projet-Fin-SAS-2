const prompt = require("prompt-sync")();

let candidats = [
  {
    cin: "AB123456",
    nom: "Boushaba",
    prenom: "Soufiane",
    partiPolitique: "java",
    age: 40,
    electeurs: [],
  },
  {
    cin: "AB678912",
    nom: "kawtar",
    prenom: "zzatami",
    partiPolitique: "independant",
    age: 25,
    electeurs: ["mm"],
  },
  {
    cin: "AB1234",
    nom: "hajar",
    prenom: "mery",
    partiPolitique: "independant",
    age: 33,
    electeurs: ["mm", "kk", "rr", "tt"],
  },
  {
    cin: "AR1234",
    nom: "rita",
    prenom: "da7do7",
    partiPolitique: "java",
    age: 29,
    electeurs: ["mm", "kk"],
  },
  {
    cin: "AF5689",
    nom: "rita",
    prenom: "da7do7",
    partiPolitique: "independant",
    age: 29,
    electeurs: [],
  },
];

function MenuPrincipal() {
  console.log(
    `========= Menu_Principal========
       1. Ajouter un nouveau candidat 
       2. Ajouter plusieurs candidats à la fois
       3. Afficher la liste des candidats 
       4. Voter pour un candidat 
       5. Modifier les informations d'un candidat 
       6. Supprimer un candidat
       7. Rechercher des candidats
       8. Statistiques de l'élection
       0. Quitter
     ===================================
`,
  );

  const choix = Number(prompt(" entrer votre choix : "));
  switch (choix) {
    case 1:
      AjouterNouveaucandidat();
      break;
    case 2:
      AjouterPlusieursCandidats();
      break;
    case 3:
      Afficher_la_list_candidats();
      break;
    case 4:
      Voter_pour_un_candidat();
      break;
    case 5:
      ModifierInformationsCandidat();
      break;
    case 6:
      SupprimerCandidat();
      break;
    case 7:
      Rechercher_des_candidats();
      break;
    case 8:
      StatistiquesElection();
      break;
    case 0:
      Quitter();
      break;
  }
}
MenuPrincipal();

function AjouterNouveaucandidat() {
  console.log("  ====votre information====  ");
  let cin = prompt("Entrer votre CIN : ");
  let nom = prompt("Entrer votre nom : ");
  let prenom = prompt("Entrer votre prénom : ");
  let partiPolitique = prompt("entrer votr partipolitique : ");
  let age = Number(prompt("entrer votr age : "));
  let electeurs = [];
  console.log(" =========================== ");
  let nouveauCandidat = {
    cin: cin,
    nom: nom,
    prenom: prenom,
    partiPolitique: partiPolitique,
    age: age,
    electeurs: electeurs,
  };
  candidats.push(nouveauCandidat);
  console.log(candidats);
  MenuPrincipal();
}

function AjouterPlusieursCandidats() {
  let nomber = Number(prompt(" combien de candidat vous voulez ajouter ? "));
  for (let i = 0; i < nomber; i++) {
    AjouterNouveaucandidat();
  }
  MenuPrincipal();
}

function Afficher_la_list_candidats() {
  console.log("===============================");
  console.log("          betite menu          ");
  console.log("===============================");
  console.log("1- le nomber de vote :");
  console.log("2- filtrez parti politique spécifique  :");
  let choix = Number(prompt("entrer votre choix "));
  switch (choix) {
    // Trier les candidats par nombre de votes (ordre décroissant pour voir les gagnants) par bubl sort
    // afichie les candidas qui avez plus de electeur
    case 1:
      for (let i = 0; i < candidats.length - 1; i++) {
        for (let j = 0; j < candidats.length - i - 1; j++) {
          if (
            candidats[j].electeurs.length < candidats[j + 1].electeurs.length
          ) {
            let temp = candidats[j];
            candidats[j] = candidats[j + 1];
            candidats[j + 1] = temp;
          }
        }
      }
      //  afichie avec cette maniar dans chaque candidat
      for (let i = 0; i < candidats.length; i++) {
        console.log("==== la liste de candidats ====");
        console.log("cin : " + candidats[i].cin);
        console.log("nom : ", candidats[i].nom);
        console.log("prenome : ", candidats[i].prenom);
        console.log("parti Politique : ", candidats[i].partiPolitique);
        console.log("age : ", candidats[i].age);
        console.log("electeurs : ", candidats[i].electeurs);
        console.log("===================================");
      }
      break;
    //   Filtrer et afficher uniquement les candidats d'un parti politique spécifique.
    //  affichie les candidat qui avez le meme politique
    case 2:
      let Politique = prompt(" entre votre parti politique : ");
      for (let i = 0; i < candidats.length; i++) {
        if (Politique === candidats[i].partiPolitique) {
          console.log(candidats[i]);
          // console.log("exist")
        }
      }
  }
  MenuPrincipal();
}

function Voter_pour_un_candidat() {
  // Demander à l’électeur de saisir sa propre CIN
  //  si il a deja vote etre interdie si no nous donne autorisation pur vote

  let cin = prompt("entrer votre propr cin");
  let dejavote = false;
  for (let i = 0; i < candidats.length; i++) {
    for (let j = 0; j < candidats[i].electeurs.length; j++) {
      if (candidats[i].electeurs[j] === cin) {
        dejavote = true;
        break;
      }
    }
  }
  if (dejavote) {
    console.log("Vous avez déjà voté");
    MenuPrincipal();
    return;
  }
  // si il peux vote il ecrirre le cin de candidate prefere et nous push dans le electeurs de ton prefer candidate.

  let cinCandidat = prompt("entre le num de cin de candidat tu prefer");
  let trouve = false;
  for (let i = 0; i < candidats.length; i++) {
    if (candidats[i].cin === cinCandidat) {
      candidats[i].electeurs.push(cin);
      trouve = true;
      console.log("vous avez vouter avec succes");
      break;
    }
  }
  if (!trouve) {
    console.log("candidats introuvabl");
  }
  MenuPrincipal();
}

function ModifierInformationsCandidat() {
  // entrer le cin de candidat si nous trouve il peux change.
  let cin = prompt("entre le cin de candidat ");
  for (let i = 0; i < candidats.length; i++) {
    if (candidats[i].cin === cin) {
      console.log(" ==== menu modification ====");
      console.log(" 1 - Modifier le parti politique ");
      console.log(" 2 -  Modifier l'âge ");
      console.log("=============================");
      let choix = Number(prompt("entrer votre choix "));
      switch (choix) {
        // Modifier le parti politique d'un candidat.
        case 1:
          candidats[i].partiPolitique = prompt(
            "Entrez le nouveau parti politique : ",
          );
          console.log("Parti politique modifié avec succès.");
          break;
        case 2:
          // Modifier l'âge d'un candidat.
          candidats[i].age = Number(prompt("entre votre nouveau age : "));
          console.log("age modifié avec succés ");
      }
    }
  }
  MenuPrincipal();
}
