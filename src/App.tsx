import viteLogo from '/money.svg'
import './App.css'
import { useNavigate } from 'react-router-dom';

function App() {
  
  const navigate = useNavigate();

  return (
    <>
      <div>
          <img src={viteLogo} className="logo" alt="Vite logo" />
      </div>
      <div className="buttons">
        <button className="button"
          onClick={() => {
            navigate("/user");
          }}
          > User
        </button>

        <button className="button"
          onClick={() => {
            navigate("/admin");
          }}
        >Admin</button>
      </div>
    </>
  )
}

export default App
