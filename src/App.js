import './App.css';
import SignUpForm from './SignUpForm/SignUpForm';

function App() {
  return (
    <div className="container mx-auto">
      <h2 className="pt-12 pb-6 text-center text-4xl font-bold tracking-tight text-gray-900">
        Sign up for your account
      </h2>
      <SignUpForm/>
    </div>
  );
}

export default App;
