class trigger {
    constructor() {
        this.year = 2020;
        this.mounth=0;
        this.day=0;
        this.hour=0;
        this.minute=0;
        this.command=""
        this.triggerid=0
        this.triggerDay=""
        this.found=0
    }

    creatTrigger(){
      this.triggerDay = new Date(this.year,this.mounth-1,this.day,this.hour,this.minute); 
      this.triggerid=ScriptApp.newTrigger("runTrigger").timeBased().at(this.triggerDay).create().getUniqueId()
      this.addTrigger()
    }
    addTrigger(){
      let number=triggerSheet.getRange("D1").getValue()
      triggerSheet.getRange("A"+(number+2)).setValue(this.command)
      triggerSheet.getRange("B"+(number+2)).setValue(this.triggerDay)
      triggerSheet.getRange("C"+(number+2)).setValue(this.triggerid)
      triggerSheet.getRange("D1").setValue(number+1)
    }
    runTrig(){
      let number=triggerSheet.getRange("D1").getValue()
      number=number+2
      this.found=0
      for(let i=2;i<=number;i++){
        if (this.triggerid==triggerSheet.getRange("C"+(i)).getValue()){
          this.command=triggerSheet.getRange("A"+i).getValue()
          this.found=1
          break
        }

      }
      if (this.found==1){
        let status=settingSheet.getRange("B5").getValue();
        if (status=="выкл"){
          obrabotkaMesageClass(this.command)
        }
        else if (status=="вкл"){
          obrabotkaMesageClassTurbo(this.command)
  }
      }
    }
    
}


function runTrigger(s){
  trig.triggerid=s.triggerUid
  trig.runTrig()

}

function clearTrigger(){
  let number=triggerSheet.getRange("D1").getValue()
  number=number+2
  triggerSheet.getRange("D1").setValue(0)

  for(let i=2;i<=number;i++){
    triggerSheet.getRange("A"+i).setValue("")
    triggerSheet.getRange("B"+i).setValue("")
    triggerSheet.getRange("C"+i).setValue("")

  }
}


var trig=new trigger()


