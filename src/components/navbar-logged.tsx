import { SearchBar } from './searchbar';
import { NotificationsButton } from './notifications-button';
import { AccountButton } from './account-button';

function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-pink-200">
      <div className="flex items-center space-x-6">
        <div className="text-white text-lg">Logo</div>
        <div className="flex-grow pl-32 w-[60vw]">
          <SearchBar />
        </div>
      </div>
      <div className="flex items-center space-x-6">
        <NotificationsButton />
        <AccountButton />
      </div>
    </nav>
  );
}

export default Navbar;