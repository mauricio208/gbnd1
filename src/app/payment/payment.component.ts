import { Component, OnInit, HostListener } from '@angular/core';
import { PaymentService } from '../payment.service';
import { AuthService } from '../auth.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  handler: any;
  paymentReady: Boolean;
  // amount = 500;

  back(): void {
    this.location.back();
  }

  constructor(private auth: AuthService, private pay: PaymentService, private location: Location) { }
  ngOnInit() {
    this.paymentReady = false;
    this.handler = StripeCheckout.configure({
      key: 'pk_test_GO5CKi1N4FAXudo4HeLpdSh9', // change for enviroment var
      image: '',
      locale: 'auto',
      token: token => {
        this.pay.initializeUser({
          'stripeToken': token,
          'userData': this.auth.getSession()
        });
        this.paymentReady = true;
      }
    });
  }

  handlePayment() {
    this.handler.open({
      name: 'Growthbond',
      description: 'Growthbond services',
      // amount: this.amount
    });
  }

  @HostListener('window:popstate')
    onPopstate() {
      this.handler.close();
    }
}


// import { Component, OnInit, HostListener } from '@angular/core';
// import { PaymentService } from '../payment.service';
// import { environment } from '../../../environments/environment';

// @Component({
//   selector: 'make-payment',
//   templateUrl: './make-payment.component.html',
//   styleUrls: ['./make-payment.component.scss']
// })
// export class MakePaymentComponent implements OnInit {

//   handler: any;
//   amount = 500;

//   constructor(private paymentSvc: PaymentService ) { }

//   ngOnInit() {
//     this.handler = StripeCheckout.configure({
//       key: environment.stripeKey,
//       image: '/your/awesome/logo.jpg',
//       locale: 'auto',
//       token: token => {
//         this.paymentSvc.processPayment(token, this.amount)
//       }
//     });
//   }

//   handlePayment() {
//     this.handler.open({
//       name: 'FireStarter',
//       excerpt: 'Deposit Funds to Account',
//       amount: this.amount
//     });
//   }

//   @HostListener('window:popstate')
//     onPopstate() {
//       this.handler.close()
//     }

// }
