import { Component,  SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-emi',
  templateUrl: './emi.component.html',
  styleUrl: './emi.component.css'
})
export class EmiComponent  {





  principal!: number;
  intrest!: number;
  tenuer!: number;
  n!: number;
  updated_principal!: number;
  balance: number[] = []
  months: string[] = ["jan", "feb", "march", "april", "may", "jun", "july", "aug", "sep", "oct", "nov", "dec"]
 

  monthly_principal: number[] = []
  monthly_intrest: number[] = []
  emi_amount!: number;
  total_payment!:number;
  total_interest!:number;
  isEmiScheduleGenerated = false;


  emiSchedule: { [year: number]:{name: string; principal: number; interest: number, total_payment: number, balance:number}[]} = {};

  //EMI = [P x R x (1+R)^N]/[(1+R)^N-1]


  calculatePercentage() {

   let principalPaid: number = Number(this.principal); // Example amount
   console.log("prinicpal paid"+principalPaid)
   let interestPaid: number =Number( this.total_interest); // Example amount
   let percentage: number = 0;
   let circumference: number = 0;


    let totalPaid:number =Number( principalPaid) +Number( interestPaid);
   console.log("total paid"+totalPaid)

    percentage = (principalPaid / totalPaid) * 100;
   console.log("percentage "+percentage)
  
    let radius = 90;
    circumference = 2 * Math.PI * radius;
  
    
    const circleProgress = document.querySelector('.circle-progress') as SVGCircleElement;
    circleProgress.style.strokeDasharray = `${circumference} ${circumference}`;
    const offset = circumference - (percentage / 100) * circumference;
    circleProgress.style.strokeDashoffset = `${offset}`;
  }
  

  calculate(): number {
    let R = this.intrest / (12 * 100)

    this.emi_amount = this.principal * R * (Math.pow(1 + R, this.tenuer)) / (Math.pow(1 + R, this.tenuer) - 1)
    this.n = parseFloat(this.emi_amount.toFixed(2))

    this.total_payment=parseFloat((this.emi_amount*this.tenuer).toFixed(0))
    this.total_interest=parseFloat( (this.total_payment-this.principal).toFixed(0))
    this.emiSchedule={}
    this.isEmiScheduleGenerated=false;
    this.calculatePercentage()
    this.amortizeIntrest()
    this.drop_down()
    return parseFloat(this.emi_amount.toFixed(2));
  }

  amortizeIntrest() {
    if(this.monthly_intrest.length!=this.tenuer){

    this.updated_principal = this.principal
    while (this.updated_principal > 0) {

      let R = this.intrest / (12 * 100)
      let monthly_intrest = parseFloat((this.updated_principal * R).toFixed(2))
      //this is monthly intrest pay 
      this.monthly_intrest.push(monthly_intrest)
      let monthly_principal = this.emi_amount - monthly_intrest
      let n = parseFloat(monthly_principal.toFixed(2))
      //this is principal amount for monthly payment
      this.monthly_principal.push(n)
      this.updated_principal = parseFloat((this.updated_principal - monthly_principal).toFixed(2))
      //this is balance
      this.balance.push(this.updated_principal)

      

    }}
  }

  drop_down() {

    if(this.isEmiScheduleGenerated)return;

    let startmonth= (new  Date().getMonth() )+1;
    let startyear = new Date().getFullYear()
    console.log(startmonth)
    console.log(startyear)

    

    for(let i=0;i<this.tenuer;i++){
      if(!this.emiSchedule[startyear]){
        this.emiSchedule[startyear] = []
      } 
      this.emiSchedule[startyear].push({
        name: this.months[startmonth % 12],
        principal:parseFloat( (this.monthly_principal[i]).toFixed(0)),
        interest: parseFloat((this.monthly_intrest[i]).toFixed(0)),
        total_payment:parseFloat(( (this.monthly_intrest[i]+this.monthly_principal[i]).toFixed(0))),
        balance:parseFloat((this.balance[i]).toFixed(0))
      }); // Add month to current year
      startmonth++;
      if (startmonth % 12 === 0) startyear++;
     

  }
  this.isEmiScheduleGenerated=true
  
}

validateNonNegative(event: Event) {
  const input = event.target as HTMLInputElement;

  if (input.value.startsWith('-')) {
   
    input.value = input.value.replace('-', '');
  }
  this.principal = Number(input.value);
}


validateNonNegativeIntrest(event: Event) {
  const input = event.target as HTMLInputElement;

  if (input.value.startsWith('-')) {
   
    input.value = input.value.replace('-', '');
  }
  this.intrest = Number(input.value);
}

validateNonNegativeTenuer(event: Event) {
  const input = event.target as HTMLInputElement;

  if (input.value.startsWith('-')) {
   
    input.value = input.value.replace('-', '');
  }
  this.intrest = Number(input.value);
}
}