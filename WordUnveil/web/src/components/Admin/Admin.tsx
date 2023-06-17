import { Link, routes } from "@redwoodjs/router"

const AdminLinkRow = ({id, route, label}) => (
  <tr key={id}>
    <td>
      <Link to={route}>{label}</Link>
    </td>
    <td>
      <nav className="rw-table-actions">
        <Link className="rw-button rw-button-small" to={`${route}/new`}>New {label}</Link>
      </nav>
    </td>
  </tr>
);

const Admin = () => {
  const links = [
    { id: 0, route: routes.users, label: "Users" },
    { id: 1, route: routes.userSettings, label: "User Settings" },
    { id: 2, route: routes.languages, label: "Languages" },
    { id: 3, route: routes.words, label: "Words" },
    { id: 4, route: routes.wordBanks, label: "Word Banks" },
    { id: 5, route: routes.letters, label: "Letters" },
    { id: 6, route: routes.games, label: "Games" },
    { id: 7, route: routes.statistics, label: "Statistics" },
    { id: 8, route: routes.tryRows, label: "Try Rows" },
  ];

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          {links.map((link) => (
            <AdminLinkRow key={link.id} route={link.route} label={link.label} id={undefined} />
          ))}
        </thead>
      </table>
    </div>
  )
}

export default Admin;
