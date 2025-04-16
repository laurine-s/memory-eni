//********/ fonction checkName \********\
// Le Nom d'utilisateur doit vérifier 3 caractères minimum.

//on écoute un event input sur input
// document.getElementById('userName').addEventListener('input', function(){
//on compare la longueur de l'input à 3car

function checkName() {
    let userName = document.getElementById('userName').value
    if (userName.length>=3) {
        //si >=, l'image est check et le message d'erreur disparait
        imgChange('userName','url(ressources1/check.svg)')
        document.getElementById('errorName').style.display = 'none';
        } else {
        //sinon, l'image est error et le message d'erreur apparait
        imgChange('userName', 'url(ressources1/error.svg)')
        document.getElementById('errorName').style.display = 'inline';
        }      
        checkForm()
        return userName.length>=3; 
} 


function imgChange(id, url) {
    document.getElementById(id).style.backgroundImage = url;
    document.getElementById(id).style.backgroundPosition = 'right';
    document.getElementById(id).style.backgroundRepeat = 'no-repeat';
}


//********/ fonction checkMail \********\
// L'email doit être un email valide.
//document.getElementById('email').addEventListener('input', function(){
    
function checkMail(){
    let email = document.getElementById('email').value
    let isOK = /^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/.test(email);

    if (isOK) {
        imgChange('email','url(ressources1/check.svg)')
        document.getElementById('errorMail').style.display = 'none';
    }else{
        imgChange('email', 'url(ressources1/error.svg)')
        document.getElementById('errorMail').style.display = 'inline';
    } 
    checkForm()
    return isOK;
}


//********/ fonction checkPassword \********\
// il doit faire au moins 6 caractères. Il doit posséder un symbole,un chiffre et des lettres.

function checkPassword() {
    let password = document.getElementById('password').value
    let passwordLength = checkPasswordLength(password);
    let passwordRules = checkPasswordRules(password);
    
    if (passwordLength && passwordRules) {
        imgChange('password','url(ressources1/check.svg)')
        document.getElementById('errorPassword').style.display = 'none';
    } else {
        imgChange('password', 'url(ressources1/error.svg)')
        document.getElementById('errorPassword').style.display = 'inline';
    } 
    helpPasswordLength()
    checkForm()
    return passwordLength && passwordRules;
}

// checkPasswordLength
function checkPasswordLength(password){
    let isOk = password.length >= 6;
    return isOk
}

//checkPasswordRules
function checkPasswordRules(password){
    let isOk = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/.test(password);
    return isOk
}



//********/ fonction checkConfirmPassword \********\
// Le mot de passe doit correspondre à la vérification du mot de passe

//document.getElementById('confirmPassword').addEventListener('input', function(){
    
function checkConfirmPassword(){
    let confirmPassword = document.getElementById('confirmPassword').value
    let password = document.getElementById('password').value

    if (password === confirmPassword) {
        imgChange('confirmPassword','url(ressources1/check.svg)')
        document.getElementById('errorConfirmPassword').style.display = 'none';
    } else {
        imgChange('confirmPassword', 'url(ressources1/error.svg)')
        document.getElementById('errorConfirmPassword').style.display = 'inline';
    } 
    checkForm()
    return password === confirmPassword;
}

//********/ fonction checkForm \********\
// Si toutes les conditions précédentes ne sont pas remplies, alors impossible de valider le formulaire

function checkForm(){
    let userName = document.getElementById('userName').value
    let isUserNameValid = userName.length>=3; 
    
    let email = document.getElementById('email').value
    let isEmailValid = /^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/.test(email);
    
    let password = document.getElementById('password').value
    let passwordLength = checkPasswordLength(password);
    let passwordRules = checkPasswordRules(password);
    let isPasswordValid = passwordLength && passwordRules
  
    let confirmPassword = document.getElementById('confirmPassword').value
    let isConfirmPasswordValid = password === confirmPassword

    if (isUserNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
        document.getElementById('valider').disabled = false ; 
    } else{
        document.getElementById('valider').disabled = true ;
    }
}

//********/ fonction helpPasswordLength \********\
// Mettre en place une aide à la saisie du mot de passe avec un niveau de difficulté du mot de passe faible, moyen, fort.
// Règles : si le mot de passe contient moins de 6 caracteres il est faible.
// S'il contient plus de 6 caracteres avec un symbole ou un nombre il est moyen.
// S'il contient plus de 9 caracteres avec un symbole et un nombre il est fort.

function helpPasswordLength(){

    let password = document.getElementById('password').value
    document.getElementById('weak').style.display = 'none';
    document.getElementById('middle').style.display = 'none';
    document.getElementById('strong').style.display = 'none';

    checkIfWeak(password)
    checkIfMiddle(password)
    checkIfStrong(password)
}

function checkIfWeak(pwd) {
    let isPasswordWeak = pwd.length>0;
    if (isPasswordWeak) {
        document.getElementById('weak').style.display = 'inline';
    }
}

function checkIfMiddle(pwd){
    let passwordContainSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(pwd)
    let passwordContainNumber = /[0-9]+/.test(pwd)
    let isPasswordMiddle = pwd.length>=6 && (passwordContainSymbol || passwordContainNumber)
    if (isPasswordMiddle) {
        document.getElementById('middle').style.display = 'inline';
    }
}

function checkIfStrong(pwd){
    let passwordContainSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(pwd)
    let passwordContainNumber = /[0-9]+/.test(pwd)
    let isPasswordStrong = pwd.length>9 && passwordContainSymbol && passwordContainNumber
    if (isPasswordStrong) {
        document.getElementById('strong').style.display = 'inline'; 
    }
}

//********/ local Storage \********\
// Enregistrer les utilisateurs dans le localStorage

//on va écouter un event click sur le bouton valider
document.getElementById('valider').addEventListener('click', function(){
//on va récupérer les donner
//et les stocker dans le local Storage
// Vérifier que la personne qui s'inscrit n'a pas déjà utilisé un email ou un nom présent dans la liste des utilisateurs déjà créés.
    let userName = document.getElementById('userName').value
    let isUserNameInStorage = userName === localStorage.getItem('userName')
    if (isUserNameInStorage) {
        alert('Le pseudo '+userName+' est déjà utilisé. Veuillez en saisir un nouveau.')
    } 
        
    let email = document.getElementById('email').value
    let isEmailInStorage = email === localStorage.getItem('email')
    if (isEmailInStorage) {
        alert('L\'adresse email '+email+' est déjà utilisée. Veuillez saisir un nouvel email.')
    }
    
    if (!isEmailInStorage && !isUserNameInStorage) {
        localStorage.setItem('userName', userName)
        localStorage.setItem('email', email)  
        localStorage.setItem('password', document.getElementById('password').value)
    }
})








function init() {
    document.getElementById('userName').addEventListener('input', checkName)
    document.getElementById('email').addEventListener('input', checkMail)
    document.getElementById('password').addEventListener('input', checkPassword)
    document.getElementById('confirmPassword').addEventListener('input', checkConfirmPassword)
}



window.onload = init;