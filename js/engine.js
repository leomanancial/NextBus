document.addEventListener('keydown', function() {
  if (event.keyCode == 123) {
    alert("This function has been disabled to prevent you from stealing my code!");
    return false;
  } else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) {
    alert("This function has been disabled to prevent you from stealing my code!");
    return false;
  } else if (event.ctrlKey && event.keyCode == 85) {
    alert("This function has been disabled to prevent you from stealing my code!");
    return false;
  }
}, false);

if (document.addEventListener) {
  document.addEventListener('contextmenu', function(e) {
    alert("This function has been disabled to prevent you from stealing my code!");
    e.preventDefault();
  }, false);
} else {
  document.attachEvent('oncontextmenu', function() {
    alert("This function has been disabled to prevent you from stealing my code!");
    window.event.returnValue = false;
  });
}

//Rodar FireBase
$(window).load(function(){
	SelecaoLinha = []

	//Firebase	
	app = firebase.initializeApp(config);
	db = app.firestore();
	//Busca de todos os dados no Firebase
  	db.collection("Linhas").get().then(function(querySnapshot) {
  	    querySnapshot.forEach(function(doc) {
			let dados = (doc.data());
			for( i in dados){
				SelecaoLinha = dados[i].bairro;
			}
	});
	//Reload na pagina a cada 10sec
	setTimeout('location.reload();', 60000);
});

//Script para buscar hora
$('#JdCaçula').bind('click',function(){

  //Variáveis  
  let myClock = new Date();
  let hour = myClock.getHours();
  let minn = myClock.getMinutes();
  let min = (minn <10?'0':'') + myClock.getMinutes();//Adiciona 0 em minutos menores que 10
	let now = hour+''+min;
	let horaCacula = SelecaoLinha;
	
  //Segunda lista que é adicionada os horários maiores que a hora local
	mostrahora = []; 

  for (let i =0; i <horaCacula.length;i++ ){ 
	// Verifica todos os horários da Tabela igual ou maior a hora local	
    if( now <= horaCacula[i] ){
	// Adiciona a Segunda lista os horários acima da hora local	   
			mostrahora.push(horaCacula[i]) 
    }
  }
	if( mostrahora[0] < 999){
	//verifica se a hora tem menos que tres digitos pegar no substring	
    let h = mostrahora[0].toString().substring(0,1);// ex 12
		let m = mostrahora[0].toString().substring(1,4);
	// Mostra o primeiro horário da Segunda lista, ou seja o próximo horário  
    $('#mostrar').text("Próximo ônibus às "+h+":"+m); 
	}
	else{
    let h = mostrahora[0].toString().substring(0,2);
		let m = mostrahora[0].toString().substring(2,4);
	// Mostra o primeiro horário da Segunda lista, ou seja o próximo horário
    $('#mostrar').text("Próximo ônibus às "+h+":"+m); 
	}
	//Limpa a segunda lista para não conflitar
  	mostrahora.splice(0, Number.MAX_VALUE); 
	});
});
