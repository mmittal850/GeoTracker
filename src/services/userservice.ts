import { UserProfile } from "../models/userProfile";

export class UserprofileService {
  private user: UserProfile [] = [];
  addItem(name: string, university :string, email:string, location:string, gender:string, ocuupation:string) {
    return this.user.push(new UserProfile(name, university, email, location, gender, ocuupation));
  }


  getItems() {
    return this.user.slice();
  }

}
