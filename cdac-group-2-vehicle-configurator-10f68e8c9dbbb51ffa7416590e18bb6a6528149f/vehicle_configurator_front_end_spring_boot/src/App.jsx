import React, { useState, useEffect, useRef } from "react";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { Configurator } from "./components/configurator";
import { Gallery } from "./components/gallery";
import AboutUs from "./AboutUs";
import Auth from "./components/Auth";
import ChatBot from "react-simple-chatbot";
import { Segment } from "semantic-ui-react";
import InvoiceGenerator from './components/InvoiceGenerator';
import AlternateModifier from './components/AlternateModifier';

import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import "./App.css";
import { BrowserRouterLink, Outlet, Routes, Route } from "react-router-dom";
import ContactUs from "./ContactUs";
import { AuthContext } from "./Contexts/AuthContext";
import { ResetContext } from "./Contexts/ResetContext";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  const [isLogged, setIsLogged] = useState(false) ;
  //const [isLoggedInFromLocalStorage,setLoggedInFromLocalStorage] = useState(localStorage.getItem("isLoggedIn"))
 // const setLoggedInState= (val)=>{localStorage.setItem("isLoggedIn",val)}
  const [segmentSelectedTop, setSegmentSelectedTop] = useState(1);
  const [chatBotKey, setChatBotKey] = useState(0);
  const chatBotContainerRef = useRef(null);

  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  // ChatBot steps
  const steps = [
    {
      id: 'Greet',
      message: 'Hello, welcome to Vehicle Configurator!',
      trigger: 'askName'
    },
    {
      id: 'askName',
      message: 'Please enter your name:',
      trigger: 'waitingName'
    },
    {
      id: 'waitingName',
      user: true,
      trigger: 'welcomeUser'
    },
    {
      id: 'welcomeUser',
      message: 'Hi {previousValue}, how can I assist you today?',
      trigger: 'askHelp'
    },
    {
      id: 'askHelp',
      options: [
        { value: 'config', label: 'Help with configuration', trigger: 'configHelp' },
        { value: 'support', label: 'Customer support', trigger: 'supportHelp' },
      ]
    },
    {
      id: 'configHelp',
      message: 'You can configure your vehicle by selecting options in the Configurator section.',
      end: true
    },
    {
      id: 'supportHelp',
      message: 'For support, please visit our Contact Us page.',
      end: true
    }
  ];

  const handleMouseLeave = () => {
    // Reset chatbot by changing its key
    setChatBotKey(prevKey => prevKey + 1);
  };

  return (
    <div>
      <Segment
        className="chatbot-container"
        floated="right"
        ref={chatBotContainerRef}
        onMouseLeave={handleMouseLeave}
      >
        <ChatBot key={chatBotKey} steps={steps} />
      </Segment>
      <ResetContext.Provider value={{ segmentSelectedTop, setSegmentSelectedTop }}>
        <AuthContext.Provider value={{ isLogged, setIsLogged }}>
          <Navigation />
          <Header data={landingPageData.Header} />
          {isLogged ? <Configurator data={landingPageData.Configurator} /> : <Auth data={landingPageData.Auth} />}
        </AuthContext.Provider>
        <Outlet></Outlet>
        <Gallery data={landingPageData.Gallery} />
        <ContactUs />
        <AboutUs />
      </ResetContext.Provider>
    </div>
  );
};

export default App;