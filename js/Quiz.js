class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    if(gameState === 1){

    //write code here to hide question elements
    question.hide();

    //write code to change the background color here
    background("yellow");

    //write code to show a heading for showing the result of Quiz
    fill("purple");
    textSize(30);
    text("Result of the quiz",320,40);
    text ("------------------------",320,70);

    //call getContestantInfo( ) here
      Contestant.getPlayerInfo()

    //write condition to check if contestantInfor is not undefined
   
    if(allContestants !== undefined){
      fill("blue");
      textSize(20);
    //write code to add a note here
      text ("*NOTE : Contestant who answered correct are highlited in green color!",130,230);
      
       //write code to highlight contest who answered correctly
       var c=1
    for (var plr in allContestants){

      var correctAns = "2";

      if(correctAns === allContestants[plr].answer){
        fill("darkgreen");
        text (allContestants[plr].name + " : " + allContestants[plr].answer + " ==>  Gave right answer" ,130,parseInt(250 + (50 + parseInt(c))));
        
      }
      else{
        fill("red");
        text (allContestants[plr].name + " : " + allContestants[plr].answer + " ==>  Gave wrong answer" ,130,parseInt(250 + (50 + parseInt(c))));
       
      }
       c=c+30;
 
   }
   }    
    
   
  }
 }
}
