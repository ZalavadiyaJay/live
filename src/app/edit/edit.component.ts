import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule ,CommonModule , HttpClientModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
  providers:[UserService]

})
export class EditComponent {

  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe((ele : any)=>{
      this.editId=ele.id
    })
    
    this.service.apiuser(this.editId).subscribe((ele : any)=>{
      this.editData = ele
      console.log(this.editData)
    })
  }
  
  constructor( private http : HttpClient,  private router : Router , private service : UserService ,private activatedRoute : ActivatedRoute){ 
    this.getdata()
  }

  public data : any
  public editData : any
  public editId : any

  public getdata(){
    this.service.userdata().subscribe((data : any)=>{
      console.log('data',data)
      this.data = data
    })
  }


  get dropdownVali() {
    return this.mainForm.get('dropdown');
  }
  get emailVali() {
    return this.mainForm.get('email');
  }
  get firstnameVali(){
    return this.mainForm.get('firstname')
  }
  get lastnameVali(){
    return this.mainForm.get('lastname')
  }
  get phoneVali(){
    return this.mainForm.get('phone')
  }
  get addressVali(){
    return this.mainForm.get('address')
  }
  get countrycodeVali(){
    return this.mainForm.get('countrycode')
  }
  get countryVali(){
    return this.mainForm.get('country')
    }

  

  public mainForm = new FormGroup({
    dropdown : new FormControl('',Validators.required),
    firstname : new FormControl('',Validators.required),
    lastname : new FormControl('',Validators.required),
    email : new FormControl('',Validators.email),
    phone : new FormControl('',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    address : new FormControl('',Validators.required),
    checkbox : new FormControl(''),    
    countrycode : new FormControl('',[Validators.required,Validators.pattern('[0-9]+$')]),
    country : new FormControl('',Validators.required),

  });


  checkBox(){
    this.check=!this.check
  }
  
  public check: boolean = false;
  public submitted: boolean = false;
  public checkbtn: boolean = false

  public UpdateData(){

    if (this.mainForm.invalid) {
      this.submitted = true;
      return 
    }

    
    let phone = this.mainForm.get('phone')?.value
    let countrycode = this.mainForm.get('countrycode')?.value
    let finalPhoneNum = countrycode + ' ' + phone
    let firstname = this.mainForm.get('firstname')?.value
    let lastname = this.mainForm.get('lastname')?.value
    let fullname = firstname + ' ' + lastname

    if (this.check == true) {
      console.log(this.mainForm.value,this.mainForm.valid);
      let data = {
        dropdown: this.mainForm.controls.dropdown.value,
        firstname : this.mainForm.controls.firstname.value,
        lastname : this.mainForm.controls.lastname.value,
        FullName : fullname,
        email: this.mainForm.controls.email.value,
        Phone : finalPhoneNum,
        phone : this.mainForm.controls.phone.value,
        address: this.mainForm.controls.address.value,
        country: this.mainForm.controls.country.value,
        countrycode : this.mainForm.controls.countrycode.value
      }

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your Data has been Updated",
      showConfirmButton: false,
      timer: 1500
    });
    this.service.UpdateUser(this.editId, data).subscribe((ele:any) => {
      console.log(ele, 'update');
      this.router.navigate(['main']);
    });
  
    }

    else{
      alert("Please Check Terms & Condition")
    }
  
  }  
  
  public reset(){
    this.mainForm.reset()
  }

public cancle(){

    Swal.fire({
      title: "Are you sure cancle?",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['main']);
      }
    });

  }

mobileCode: any;

  onCountrySelect(event: any) {
    const countryCode = event.target.value;
    const selectedCountry = this.allCountries.find(
      (country) => country.value === countryCode
    );
    if (selectedCountry) {
      this.mobileCode = selectedCountry.mobile;
    } else {
      this.mobileCode = '';
    }
  }
  
  
  allCountries = [
    { value: 'AF', desc: 'Afghanistan', mobile: '+93' },
    { value: 'AX', desc: 'Åland Islands', mobile: '+358' },
    { value: 'AL', desc: 'Albania', mobile: '+355' },
    { value: 'DZ', desc: 'Algeria', mobile: '+213' },
    { value: 'AS', desc: 'American Samoa', mobile: '+1' },
    { value: 'AD', desc: 'Andorra', mobile: '+376' },
    { value: 'AO', desc: 'Angola', mobile: '+244' },
    { value: 'AI', desc: 'Anguilla', mobile: '+1' },
    { value: 'AQ', desc: 'Antarctica', mobile: '+672' },
    { value: 'AG', desc: 'Antigua and Barbuda', mobile: '+1' },
    { value: 'AR', desc: 'Argentina', mobile: '+54' },
    { value: 'AM', desc: 'Armenia', mobile: '+374' },
    { value: 'AW', desc: 'Aruba', mobile: '+297' },
    { value: 'AU', desc: 'Australia', mobile: '+61' },
    { value: 'AT', desc: 'Austria', mobile: '+43' },
    { value: 'AZ', desc: 'Azerbaijan', mobile: '+994' },
    { value: 'BS', desc: 'Bahamas', mobile: '+1' },
    { value: 'BH', desc: 'Bahrain', mobile: '+973' },
    { value: 'BD', desc: 'Bangladesh', mobile: '+880' },
    { value: 'BB', desc: 'Barbados', mobile: '+1' },
    { value: 'BY', desc: 'Belarus', mobile: '+375' },
    { value: 'BE', desc: 'Belgium', mobile: '+32' },
    { value: 'BZ', desc: 'Belize', mobile: '+501' },
    { value: 'BJ', desc: 'Benin', mobile: '+229' },
    { value: 'BM', desc: 'Bermuda', mobile: '+1' },
    { value: 'BT', desc: 'Bhutan', mobile: '+975' },
    { value: 'BO', desc: 'Bolivia', mobile: '+591' },
    { value: 'BQ', desc: 'Bonaire, Sint Eustatius and Saba', mobile: '+599' },
    { value: 'BA', desc: 'Bosnia and Herzegovina', mobile: '+387' },
    { value: 'BW', desc: 'Botswana', mobile: '+267' },
    { value: 'BV', desc: 'Bouvet Island', mobile: '' },
    { value: 'BR', desc: 'Brazil', mobile: '+55' },
    { value: 'IO', desc: 'British Indian Ocean Territory', mobile: '+246' },
    { value: 'BN', desc: 'Brunei Darussalam', mobile: '+673' },
    { value: 'BG', desc: 'Bulgaria', mobile: '+359' },
    { value: 'BF', desc: 'Burkina Faso', mobile: '+226' },
    { value: 'BI', desc: 'Burundi', mobile: '+257' },
    { value: 'CV', desc: 'Cabo Verde', mobile: '+238' },
    { value: 'KH', desc: 'Cambodia', mobile: '+855' },
    { value: 'CM', desc: 'Cameroon', mobile: '+237' },
    { value: 'CA', desc: 'Canada', mobile: '+1' },
    { value: 'KY', desc: 'Cayman Islands', mobile: '+1' },
    { value: 'CF', desc: 'Central African Republic', mobile: '+236' },
    { value: 'TD', desc: 'Chad', mobile: '+235' },
    { value: 'CL', desc: 'Chile', mobile: '+56' },
    { value: 'CN', desc: 'China', mobile: '+86' },
    { value: 'CX', desc: 'Christmas Island', mobile: '+61' },
    { value: 'CC', desc: 'Cocos (Keeling) Islands', mobile: '+61' },
    { value: 'CO', desc: 'Colombia', mobile: '+57' },
    { value: 'KM', desc: 'Comoros', mobile: '+269' },
    { value: 'CG', desc: 'Congo', mobile: '+242' },
    { value: 'CD', desc: 'Congo, Democratic Republic of the', mobile: '+243' },
    { value: 'CK', desc: 'Cook Islands', mobile: '+682' },
    { value: 'CR', desc: 'Costa Rica', mobile: '+506' },
    { value: 'CI', desc: "Côte d'Ivoire", mobile: '+225' },
    { value: 'HR', desc: 'Croatia', mobile: '+385' },
    { value: 'CU', desc: 'Cuba', mobile: '+53' },
    { value: 'CW', desc: 'Curaçao', mobile: '+599' },
    { value: 'CY', desc: 'Cyprus', mobile: '+357' },
    { value: 'CZ', desc: 'Czech Republic', mobile: '+420' },
    { value: 'DK', desc: 'Denmark', mobile: '+45' },
    { value: 'DJ', desc: 'Djibouti', mobile: '+253' },
    { value: 'DM', desc: 'Dominica', mobile: '+1' },
    { value: 'DO', desc: 'Dominican Republic', mobile: '+1' },
    { value: 'EC', desc: 'Ecuador', mobile: '+593' },
    { value: 'EG', desc: 'Egypt', mobile: '+20' },
    { value: 'SV', desc: 'El Salvador', mobile: '+503' },
    { value: 'GQ', desc: 'Equatorial Guinea', mobile: '+240' },
    { value: 'ER', desc: 'Eritrea', mobile: '+291' },
    { value: 'EE', desc: 'Estonia', mobile: '+372' },
    { value: 'ET', desc: 'Ethiopia', mobile: '+251' },
    { value: 'FK', desc: 'Falkland Islands (Malvinas)', mobile: '+500' },
    { value: 'FO', desc: 'Faroe Islands', mobile: '+298' },
    { value: 'FJ', desc: 'Fiji', mobile: '+679' },
    { value: 'FI', desc: 'Finland', mobile: '+358' },
    { value: 'GF', desc: 'French Guiana', mobile: '+594' },
    { value: 'PF', desc: 'French Polynesia', mobile: '+689' },
    { value: 'TF', desc: 'French Southern Territories', mobile: '' },
    { value: 'GA', desc: 'Gabon', mobile: '+241' },
    { value: 'GM', desc: 'Gambia', mobile: '+220' },
    { value: 'GE', desc: 'Georgia', mobile: '+995' },
    { value: 'DE', desc: 'Germany', mobile: '+49' },
    { value: 'GH', desc: 'Ghana', mobile: '+233' },
    { value: 'GI', desc: 'Gibraltar', mobile: '+350' },
    { value: 'GR', desc: 'Greece', mobile: '+30' },
    { value: 'GL', desc: 'Greenland', mobile: '+299' },
    { value: 'GD', desc: 'Grenada', mobile: '+1' },
    { value: 'GP', desc: 'Guadeloupe', mobile: '+590' },
    { value: 'GU', desc: 'Guam', mobile: '+1' },
    { value: 'GT', desc: 'Guatemala', mobile: '+502' },
    { value: 'GG', desc: 'Guernsey', mobile: '+44' },
    { value: 'GN', desc: 'Guinea', mobile: '+224' },
    { value: 'GW', desc: 'Guinea-Bissau', mobile: '+245' },
    { value: 'GY', desc: 'Guyana', mobile: '+592' },
    { value: 'HT', desc: 'Haiti', mobile: '+509' },
    { value: 'HM', desc: 'Heard Island and McDonald Islands', mobile: '' },
    { value: 'VA', desc: 'Holy See', mobile: '+379' },
    { value: 'HN', desc: 'Honduras', mobile: '+504' },
    { value: 'HK', desc: 'Hong Kong', mobile: '+852' },
    { value: 'HU', desc: 'Hungary', mobile: '+36' },
    { value: 'IS', desc: 'Iceland', mobile: '+354' },
    { value: 'IN', desc: 'India', mobile: '+91' },
    { value: 'ID', desc: 'Indonesia', mobile: '+62' },
    { value: 'IR', desc: 'Iran', mobile: '+98' },
    { value: 'IQ', desc: 'Iraq', mobile: '+964' },
    { value: 'IE', desc: 'Ireland', mobile: '+353' },
    { value: 'IM', desc: 'Isle of Man', mobile: '+44' },
    { value: 'IL', desc: 'Israel', mobile: '+972' },
    { value: 'IT', desc: 'Italy', mobile: '+39' },
    { value: 'JM', desc: 'Jamaica', mobile: '+1' },
    { value: 'JP', desc: 'Japan', mobile: '+81' },
    { value: 'JE', desc: 'Jersey', mobile: '+44' },
    { value: 'JO', desc: 'Jordan', mobile: '+962' },
    { value: 'KZ', desc: 'Kazakhstan', mobile: '+7' },
    { value: 'KE', desc: 'Kenya', mobile: '+254' },
    { value: 'KI', desc: 'Kiribati', mobile: '+686' },
    {
      value: 'KP',
      desc: "Korea, Democratic People's Republic of",
      mobile: '+850',
    },
    { value: 'KR', desc: 'Korea, Republic of', mobile: '+82' },
    { value: 'KW', desc: 'Kuwait', mobile: '+965' },
    { value: 'KG', desc: 'Kyrgyzstan', mobile: '+996' },
    { value: 'LA', desc: "Lao People's Democratic Republic", mobile: '+856' },
    { value: 'LV', desc: 'Latvia', mobile: '+371' },
    { value: 'LB', desc: 'Lebanon', mobile: '+961' },
    { value: 'LS', desc: 'Lesotho', mobile: '+266' },
    { value: 'LR', desc: 'Liberia', mobile: '+231' },
    { value: 'LY', desc: 'Libya', mobile: '+218' },
    { value: 'LI', desc: 'Liechtenstein', mobile: '+423' },
    { value: 'LT', desc: 'Lithuania', mobile: '+370' },
    { value: 'LU', desc: 'Luxembourg', mobile: '+352' },
    { value: 'MO', desc: 'Macao', mobile: '+853' },
    {
      value: 'MK',
      desc: 'Macedonia, the Former Yugoslav Republic of',
      mobile: '+389',
    },
    { value: 'MG', desc: 'Madagascar', mobile: '+261' },
    { value: 'MW', desc: 'Malawi', mobile: '+265' },
    { value: 'MY', desc: 'Malaysia', mobile: '+60' },
    { value: 'MV', desc: 'Maldives', mobile: '+960' },
    { value: 'ML', desc: 'Mali', mobile: '+223' },
    { value: 'MT', desc: 'Malta', mobile: '+356' },
    { value: 'MH', desc: 'Marshall Islands', mobile: '+692' },
    { value: 'MQ', desc: 'Martinique', mobile: '+596' },
    { value: 'MR', desc: 'Mauritania', mobile: '+222' },
    { value: 'MU', desc: 'Mauritius', mobile: '+230' },
    { value: 'YT', desc: 'Mayotte', mobile: '+262' },
    { value: 'MX', desc: 'Mexico', mobile: '+52' },
    { value: 'FM', desc: 'Micronesia, Federated States of', mobile: '+691' },
    { value: 'MD', desc: 'Moldova, Republic of', mobile: '+373' },
    { value: 'MC', desc: 'Monaco', mobile: '+377' },
    { value: 'MN', desc: 'Mongolia', mobile: '+976' },
    { value: 'ME', desc: 'Montenegro', mobile: '+382' },
    { value: 'MS', desc: 'Montserrat', mobile: '+1' },
    { value: 'MA', desc: 'Morocco', mobile: '+212' },
    { value: 'MZ', desc: 'Mozambique', mobile: '+258' },
    { value: 'MM', desc: 'Myanmar', mobile: '+95' },
  ];
  


}

