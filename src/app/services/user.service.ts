import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http  : HttpClient) { }

  userdata(){
    return this.http.get('http://localhost:3000/user')
  }
  saveuser(data : any){
    return this.http.post('http://localhost:3000/user',data)
  }
  
deleteUser(id:any){ 
  return this.http.delete('http://localhost:3000/user/' + id)
}
apiuser(id : any){
  return this.http.get('http://localhost:3000/user/' + id)
}
UpdateUser(id:any, data:any){
  return this.http.put('http://localhost:3000/user/'+ id,data)
}
}
