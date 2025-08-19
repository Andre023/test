import { NavLink } from "react-router-dom";
import ThemeToggle from '../../contexts/ThemeToggle';
import './Navbar.css';

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-brand">
          Ticket Admin
        </NavLink>
        <nav className="navbar-nav">
          <NavLink to="/users" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            Usuários
          </NavLink>
          <NavLink to="/" end className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            Vendas
          </NavLink>
          <NavLink to="/events/new" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            Novo Evento
          </NavLink>
          <NavLink to="/sales/new" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            Nova Venda
          </NavLink>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;