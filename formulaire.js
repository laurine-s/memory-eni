//********/ fonction checkName \********\
// Le Nom d'utilisateur doit vérifier 3 caractères minimum.

//on écoute un event input sur input
document.getElementById('userName').addEventListener('input', function(){
//on compare la longueur de l'input à 3car
    let userName = this.value
    if (userName.length>=3) {
        //si >=, l'image est check et le message d'erreur disparait
        imgChange('userName','url(ressources1/check.svg)')
        document.getElementById('errorName').style.display = 'none';
        } else {
        //sinon, l'image est error et le message d'erreur apparait
        imgChange('userName', 'url(ressources1/error.svg)')
        document.getElementById('errorName').style.display = 'inline';
        }
})

function imgChange(id, url) {
    document.getElementById(id).style.backgroundImage = url;
    document.getElementById(id).style.backgroundPosition = 'right';
    document.getElementById(id).style.backgroundRepeat = 'no-repeat';
}


//********/ fonction checkMail \********\
// L'email doit être un email valide.
document.getElementById('email').addEventListener('input', function(){
    let email = document.getElementById('email').value;
    let isOK = /^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/.test(email);

    if (isOK) {
        imgChange('email','url(ressources1/check.svg)')
        document.getElementById('errorMail').style.display = 'none';
    }else{
        imgChange('email', 'url(ressources1/error.svg)')
        document.getElementById('errorMail').style.display = 'inline';
    }
})


//********/ fonction checkPassword \********\
// il doit faire au moins 6 caractères. Il doit posséder un symbole,un chiffre et des lettres.





//********/ fonction checkVerifPassword \********\
// Le mot de passe doit correspondre à la vérification du mot de passe