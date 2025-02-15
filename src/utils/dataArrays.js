import {
  UserIcon,
  ChartBarIcon,
  PresentationChartLineIcon,
  BookOpenIcon,
  BuildingStorefrontIcon,
  ArchiveBoxXMarkIcon,
  UsersIcon,
  ArrowLeftCircleIcon,
  WrenchIcon,
  CreditCardIcon,
  ChartPieIcon,
  ChatBubbleLeftRightIcon,
  ComputerDesktopIcon,
  DocumentChartBarIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

import html from "../assets/images/skill/html.png";
import c from "../assets/images/skill/c-.png";
import css from "../assets/images/skill/css3.png";
import java from "../assets/images/skill/java.png";
import js from "../assets/images/skill/js.png";
import php from "../assets/images/skill/php.png";
import sql from "../assets/images/skill/sql.png";
import node from "../assets/images/skill/node.png";
import react from "../assets/images/skill/react.png";
import tailwind from "../assets/images/skill/tailwind.png";
import androidstudio from "../assets/images/skill/androidstudio.png";
import eclips from "../assets/images/skill/eclips.png";
import firebase from "../assets/images/skill/firebase.png";
import git from "../assets/images/skill/git.png";
import github from "../assets/images/skill/github.png";
import mongodb from "../assets/images/skill/mongodb.png";
import mysql from "../assets/images/skill/mysql.png";
import postman from "../assets/images/skill/postman.png";
import vscode from "../assets/images/skill/vscode.png";


export const projects = [
  {
    img: "https://firebasestorage.googleapis.com/v0/b/test-reactnative-9bda1.appspot.com/o/portpolio%2Ftrendify%2FPicture3.png?alt=media&token=1ac11bf2-0983-42d0-96f4-cba7321d24d9",
    title: "Trendify - E-commerce Platform for Web & Mobile",
    des1: "This project aims to create a robust e-commerce platform utilizing client-server architecture to support both web-based back-office operations and mobile customer interactions. The system includes a mobile app focused on customer usage and a web application for administrators, vendors, and customer service representatives (CSRs). Administrators manage users and vendors, while vendors handle product orders and inventory. CSRs focus on customer relations, especially for order cancellations and general order processing. Customers can browse, buy products, track order statuses, and interact with sellers through the mobile app.",
    des2: "The mobile app and web application are integrated, with order cancellations handled by CSRs or administrators instead of customers directly. The web application serves multiple roles, including managing products, orders, and users, while also offering communication tools like notifications and alerts for seamless interaction. The mobile app provides a dedicated Android interface for customer actions such as browsing, purchasing, and rating products.",
    des3: "The system leverages several technologies, including React for the web application, Android/Kotlin for mobile development, and C# Web API for centralized business logic processing. Both apps interact with a NoSQL database and connect to the central web service hosted on IIS, ensuring efficient data flow and business operations across the platform.",
    technology: ["React", "Kotlin", "Asp.NET", "mongoDB"],
    type: "web",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/test-reactnative-9bda1.appspot.com/o/1.PNG?alt=media&token=b324a49c-14ea-4dd1-808e-9ddba00eb9d8",
    title: "CodeSense - Static Code Analyzer Web Application",
    des1: "The Code Analyzer Web App is a comprehensive tool designed to assist developers in analyzing Java code files, enhancing code quality, and improving efficiency. It offers a range of features including code complexity analysis, syntax error detection, and code duplication identification. Users can upload Java files, manage them within their profiles, and perform detailed analyses to ensure their code adheres to clean and efficient practices.",
    des2: "The platform also supports user management, allowing users to register, log in, and manage their uploaded files. Features like saving, revising, and downloading previously uploaded code provide convenience and accessibility. Additionally, the app includes user feedback functionality, enabling reviews and suggestions for further enhancement of the tool. By offering metrics on software composition, including class counts and other structural insights, it becomes a valuable resource for developers striving to refine their Java projects.",
    des3: "Built using the MERN stack, the app leverages React for an interactive frontend and Node.js with Express for backend logic and API routing. MongoDB serves as the database for storing user data, code files, and reviews. Key technologies like Java parser libraries and code analysis tools are utilized for parsing and analyzing Java code. Authentication is secured with JSON Web Tokens (JWT), while CSS and React Bootstrap ensure a polished user interface. This combination of technologies delivers a robust, user-friendly, and efficient code analysis solution.",
    technology: ["React", "Node.js", "Express", "MongoDB"],
    type: "web",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/test-reactnative-9bda1.appspot.com/o/CeyLaundry.png?alt=media&token=f10859ec-bd58-415b-a5a0-d152fa84a878",
    title: "CeyLaundry - Onine Laundry Service Web Application",
    des1: "The Online Laundry Service is a web-based platform designed to make scheduling and managing laundry services more convenient for users. The application allows customers to register, log in, and access a variety of laundry services. Users can easily select the services they need, book appointments, and make secure online payments, streamlining the entire laundry process.",
    des2: "A key feature of the platform is real-time order tracking, which ensures transparency by allowing users to monitor the status of their laundry. The system also includes an admin dashboard that enables service providers to manage user accounts, monitor service availability, and handle laundry orders efficiently. This dual focus on user convenience and service provider management ensures a seamless experience for all stakeholders.",
    des3: "The website is developed using a combination of HTML, CSS, and PHP. HTML structures the web pages, while CSS enhances their visual appeal. PHP handles server-side operations, including user authentication and data management, with MySQL serving as the database to store user, service, and order information. JavaScript adds interactivity, improving the overall user experience. Together, these technologies create a functional, user-friendly platform for managing laundry services online.",
    technology: ["HTML", "Php" , "MySQL"],
    type: "web",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/test-reactnative-9bda1.appspot.com/o/DigitMaster.jpg?alt=media&token=bff54acd-49f1-4a64-aa3e-44acdd6455b6",
    title: "DIGIT MASTER - Calculator & QR Scanner Mobile Application",
    des1: "The Code Analyzer Web App is a powerful tool designed to analyze Java code files, calculate code complexity, identify syntax errors, and help maintain clean and efficient code.",
    key_features: [],
    tech_stack: [],
    technology: ["Kotlin"],
    type: "mobile",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/test-reactnative-9bda1.appspot.com/o/blood.jpg?alt=media&token=77bf1d50-249d-4e39-8aa6-1598403e52f0",
    title: "BloodUnity - Online Blood Donation Mobile Application",
    des1: "BloodUnity is a mobile application developed using React Native to streamline the process of online blood donation. It provides a platform for users to register as blood donors, connect with others in need, and manage blood donation-related activities. Through secure user authentication, individuals can register using their email, verify their identity, and log in to the app. Once registered, users can become blood donors by completing a form and view a comprehensive list of donors with filtering options based on district and blood type, ensuring quick and efficient donor matching.",
    des2: "The app also empowers users to request blood donations by contacting registered donors directly via phone calls using the Ask for Help feature. It offers functionality to organize and manage blood donation events, enabling users to add, delete, and view event details filtered by district. Additionally, BloodUnity enhances awareness about blood donation by providing access to informative articles on topics such as blood donation benefits, requirements, and global campaigns like World Blood Donor Day.",
    des3: "BloodUnity leverages modern technologies to deliver a seamless user experience. Built using React Native, it ensures compatibility across mobile platforms while maintaining a responsive and engaging interface. Firebase is employed for secure user authentication and robust data storage, facilitating real-time updates and scalability. Together, these technologies create an efficient and reliable app to promote blood donation and foster a supportive donor community.",
    technology: ["React-Native", "Firebase"],
    type: "mobile",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/test-reactnative-9bda1.appspot.com/o/cakefantasy.png?alt=media&token=61cd506f-3285-4ce0-aa1c-19d06e4a9022",
    title: "CakeFantasy -  Online Cake Shop Management System",
    des1: "The Online Cake Shop Management System is a web-based application designed to simplify the operation and management of an online cake shop. It provides a seamless interface for customers to browse an extensive cake catalog, place orders, and leave reviews. For administrators, it offers robust tools to manage the cake catalog, monitor customer information, and handle incoming orders efficiently.",
    des2: "Customers can securely register and log in to their accounts, browse detailed cake listings, and conveniently place orders by providing delivery details and selecting payment methods. They can also leave ratings and reviews for products, helping other customers make informed decisions. Administrators have access to powerful features for managing cake inventory, processing orders, and overseeing customer profiles, ensuring smooth shop operations.",
    des3: "The system is built using the MERN stack, leveraging React for a dynamic frontend and Node.js with Express.js for backend logic and API routing. MongoDB serves as the database for storing user, product, and order data. JSON Web Tokens (JWT) ensure secure authentication and authorization, while CSS and React Bootstrap are used for creating a polished and responsive user interface. Together, these technologies deliver a user-friendly and efficient platform for managing an online cake shop.",
    technology: ["React", "Node.js", "Express", "MongoDB"],
    type: "web",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/test-reactnative-9bda1.appspot.com/o/little%20love.jpg?alt=media&token=cb1ac9ca-a915-43de-a853-3160c8cb472b",
    title: "LittleLove - Mother & Baby Health Management Mobile Application",
    des1: "The Mother and Baby Health Management App is a mobile application designed to address the unique healthcare needs of mothers and midwives. By offering role-based user management, the app provides tailored experiences for each user group. Mothers can manage their clinic visits, vaccination schedules, and track essential health information for themselves and their babies. Midwives benefit from features that allow them to access and update patient records efficiently, ensuring comprehensive and personalized care.",
    des2: "A standout feature of the app is its integration of health monitoring tools. Mothers and midwives can access clinic and vaccine records, view health graphs that visualize growth and health trends, and use a built-in BMI calculator for babies. The app generates specific alerts based on baby BMI rates, helping users monitor infant development effectively. Additionally, a unique QR code is assigned to each mother, simplifying the process for midwives to retrieve and update healthcare details with ease.",
    des3: "The app combines user-friendly design with advanced technology to create a seamless healthcare management experience. Built using modern mobile app development frameworks, the app incorporates robust user role management, QR code integration for quick data access, and graph generation tools for health visualization. It also supports features that integrate healthcare management with shopping for baby essentials, offering a well-rounded solution for mothers and healthcare professionals.",
    technology: ["React-Native", "Firebase"],
    type: "mobile",
  },
];


export const skills = [
  {
    icon: html,
  },
  {
    icon: css,
  },
  {
    icon: js,
  },
  {
    icon: c,
  },
  {
    icon: php,
  },
  {
    icon: sql,
  },
  {
    icon: java,
  },
  {
    icon: react,
  },
  {
    icon: node,
  },
  {
    icon: tailwind,
  },
  {
    icon: git,
  },
  {
    icon: github,
  },
  {
    icon: postman,
  },
  {
    icon: vscode,
  },
  {
    icon: androidstudio,
  },
  {
    icon: eclips,
  },
  {
    icon: mongodb,
  },
  {
    icon: firebase,
  },
  {
    icon: mysql,
  },
];

const CustomerArray = [
  {
    title: "Add Customers",
    link: "add-customers",
    priv_name: "Customer_Management",
    icon: UserIcon,
  },
  {
    title: "List Customers",
    link: "list-customers",
    priv_name: "Customer_Management",
    icon: UserIcon,
  },
  {
    title: "Customer Credit Logs",
    link: "customer-credit-logs",
    priv_name: "Customer_Credit_Logs",
    icon: BookOpenIcon,
  },
  {
    title: "Customer Returns",
    link: "customer-returns",
    priv_name: "Customer_Returns",
    icon: ArchiveBoxXMarkIcon,
  },
];

export const newNavigationItems = [
  {
    title: "Dashboard",
    link: "/admin",
    icon: ChartBarIcon,
    priv_name: 0,
    children: "",
  },
  {
    title: "Project",
    link: "#",
    icon: UserIcon,
    priv_name: 0,
    children: [
      {
        title: "All Projects",
        link: "/admin/projects",
        icon: UserIcon,
        priv_name: 0,
      },
      {
        title: "Add Project",
        link: "/admin/dashboard",
        icon: UserIcon,
        priv_name: 0,
      },
    ],
  },

];

