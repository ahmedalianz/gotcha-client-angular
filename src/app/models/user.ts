export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  security: {
    securityQuestion: string;
    securityAnswer: string;
  };
  profilePic: string;
  adress: {
    country: string;
    city: string;
  };
  token: string;
  role: string;
  position?: string;
}
