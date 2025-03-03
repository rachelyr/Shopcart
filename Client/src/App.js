import './App.css';
import React, {Suspense} from 'react';
import AOS from 'aos';
import {Routes, Route} from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import 'aos/dist/aos.css';
import {PopUpProvider} from './Context/PopUpContext'; //SOME ERROR
//import ToastContainer from './Components/Notifications/Toaster';
import BigLoader from './Components/Notifications/BigLoader';
import ProtectedRouter from './ProtectedRouter';


const HomeScreen= React.lazy(() => import('./Redux/Screens/Homescreen'));
const AboutUs= React.lazy(() => import('./Redux/Screens/AboutUs'));
const ContactUs= React.lazy(() => import('./Redux/Screens/ContactUs'));
const Shop= React.lazy(() => import('./Redux/Screens/Shop'));
const FAQPage= React.lazy(() => import('./Redux/Screens/FAQ'));
const PrivacyPolicy= React.lazy(() => import('./Redux/Screens/Privacy'));
const TermsAndConditions= React.lazy(() => import('./Redux/Screens/TermsAndConditions'));
const OrderScreen = React.lazy(() =>import ('./Redux/Screens/OrderScreen'));
// const OrderScreen = React.lazy(async () => {
//   const module = await import('./Redux/Screens/OrderScreen');
//   console.log("Imported OrderScreen module:", module);
//   return module;
// }); a debug check
const Dashboard= React.lazy(() => import('./Redux/Screens/Dashboard/Dashboard'));
const Orders= React.lazy(() => import('./Redux/Screens/Dashboard/Orders'));
const UpdateProfile= React.lazy(() => import('./Redux/Screens/Dashboard/UpdateProfile'));

const Password= React.lazy(() => import('./Redux/Screens/Dashboard/Password'));
const Registration = React.lazy(() => import('./Redux/Screens/Dashboard/Registration'));

const NotFound= React.lazy(() => import('./Redux/Screens/NotFound'));
const ProductDetails= React.lazy(() => import('./Redux/Screens/ProductDetails'));


function App() {
  AOS.init();
  return (
    <PopUpProvider>
      <ScrollToTop/>
          <Routes>
            {/* PROTECTED */}
            <Route element={<ProtectedRouter/>}>

            <Route
            path= '/orders/:id'
            element={
              <Suspense fallback={<BigLoader/>}>
                <OrderScreen/>
              </Suspense>
            }/>
            <Route
            path= '/dashboard'
            element={
              <Suspense fallback={<BigLoader/>}>
                <Dashboard/>
              </Suspense>
            }/>
            <Route
            path= '/profile'
            element={
              <Suspense fallback={<BigLoader/>}>
                <UpdateProfile/>
              </Suspense>
            }/>
            <Route
            path= '/password'
            element={
              <Suspense fallback={<BigLoader/>}>
                <Password/>
              </Suspense>
            }/>
            <Route
            path= '/orders'
            element={
              <Suspense fallback={<BigLoader/>}>
                <Orders/>
              </Suspense>
            }/>

            </Route>

            {/* PUBLIC */}

            <Route
            path= '/'
            element={
              <Suspense fallback={<BigLoader/>}>
                <HomeScreen/>
              </Suspense>
            }/>
            <Route
            path= '/registration'
            element={
              <Suspense fallback={<BigLoader/>}>
                <Registration/>
              </Suspense>
            }/>
            <Route
            path= '/card/:id'
            element={
              <Suspense fallback={<BigLoader/>}>
                <ProductDetails/>
              </Suspense>
            }/>
            <Route
            path= '/about-us'
            element={
              <Suspense fallback={<BigLoader/>}>
                <AboutUs/>
              </Suspense>
            }/>
            <Route
            path= '/contact-us'
            element={
              <Suspense fallback={<BigLoader/>}>
                <ContactUs/>
              </Suspense>
            }/>
            <Route
            path= '/shop'
            element={
              <Suspense fallback={<BigLoader/>}>
                <Shop/>
              </Suspense>
            }/>
            <Route
            path= '/faq'
            element={
              <Suspense fallback={<BigLoader/>}>
                <FAQPage/>
              </Suspense>
            }/>
            <Route
            path= '/terms-conditions'
            element={
              <Suspense fallback={<BigLoader/>}>
                <TermsAndConditions/>
              </Suspense>
            }/>
            <Route
            path= '/policy'
            element={
              <Suspense fallback={<BigLoader/>}>
                <PrivacyPolicy/>
              </Suspense>
            }/>
            <Route
            path= '*'
            element={
              <Suspense fallback={<BigLoader/>}>
                <NotFound/>
              </Suspense>
            }
            />
          </Routes>
    </PopUpProvider>
  );
}

export default App;
