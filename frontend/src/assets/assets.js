// product images

import p_img1 from "./p_img1.png";
import p_img2_1 from "./p_img2_1.png";
import p_img2_2 from "./p_img2_2.png";
import p_img2_3 from "./p_img2_3.png";
import p_img2_4 from "./p_img2_4.png";
import p_img3 from "./p_img3.png";
import p_img4 from "./p_img4.png";


/*
import p_img4 from "./p_img4.png";
import p_img5 from "./p_img5.png";
import p_img6 from "./p_img6.png";
import p_img7 from "./p_img7.png";
import p_img8 from "./p_img8.png";
import p_img9 from "./p_img9.png";
import p_img10 from "./p_img10.png";
import p_img11 from "./p_img11.png";
import p_img12 from "./p_img12.png";

// icons
import bin_icon from "./bin_icon.png";
import cart_icon from "./cart_icon.png";
import dropdown_icon from "./dropdown_icon.png";
import exchange_icon from "./exchange_icon.png";
import menu_icon from "./menu_icon.png";
import cross_icon from "./cross_icon.png";
import hero_img from "./hero_img.png";
import logo from "./logo.png";
import about_img from "./about_img.png";
import contact_img from "./contact_img.png";
*/
// products data
export const products = [
  {
    _id: "aaaaa",
    name: "smartphone",
    description:
      "A sleek, lightweight smartphone designed for comfort and performance.",
    price: 50,
    image: [p_img1],
    category: "Men",
    subCategory: "Topwear",
    sizes: [ "M"],
    date: 1716621345448,
    bestseller: true,
  },
  {
    _id: "aaaab",
    name: "washing machine",
    description:
      "A modern, energy-efficient washing machine designed for powerful cleaning with minimal effort.",
    price: 200,
    image: [p_img2_1, p_img2_2, p_img2_3, p_img2_4],
    category: "kids",
    subCategory: "Topwear",
    sizes: ["M", "L", "XL"],
    date: 1716621345448,
    bestseller: true,
  },
  {
    _id: "aaaac",
    name: "man",
    description:
      "A spacious, energy-efficient refrigerator designed to keep your food fresh and organized.",
    price: 300,
    image: [p_img3, p_img3, p_img3, p_img3],
    category: "kids",
    subCategory: "Topwear",
    sizes: ["S", "M", "L"],
    date: 1716621345448,
    bestseller: false,
  },

  {
    _id: "aaaad",
    name: "child",
    description:
      "A spacious, energy-efficient refrigerator designed to keep your food fresh and organized.",
    price: 300,
    image: [p_img4,],
    category: "kids",
    subCategory: "Topwear",
    sizes: ["S", "M", "L"],
    date: 1716621345448,
    bestseller: false,
  }

];

// export assets
import cart_icon from "./cart_icon.png";
import menu_icon from "./menu_icon.png";
import profile_icon from "./profile_icon.png";
import search_icon from "./search_icon.png";
import logo from "./logo.png";
import back_icon from "./back_icon.png";
import hero_img from "./hero_img.png";
import exchange_icon from "./exchange_icon.png";
import quality_icon from "./quality_icon.png";
import support_icon from "./support_icon.png";
import close_icon from "./close_icon.png";
import bin_icon from "./bin_icon.png";
import stripe_logo from "./stripe_logo.png";
import razorpay_pay from "./razorpay_pay.png";
import star_half_icon from "./star_half_icon.png";
import star_icon from "./star_icon.png";
import about_us from "./about_us.png";







export const assets = {
  logo,
  search_icon,
  profile_icon,
  cart_icon,
  menu_icon,
  back_icon,
  hero_img,
  exchange_icon,
  quality_icon,
  support_icon,
  close_icon,
  bin_icon,
  stripe_logo,
  razorpay_pay,
  star_icon,
  star_half_icon,
   about_us,
  
  /*
  hero_img,
  cart_icon,
  dropdown_icon,
  exchange_icon,
  bin_icon,
  menu_icon,
  cross_icon,
  about_img,
  contact_img,
  */
};
