import { useParams, useSearchParams } from "react-router";
import Menu from "../components/Menu.jsx";
import SearchBar from "../components/SearchBar.jsx";
import { Loading, ErrorMessage } from "../components/Status.jsx";
import { useVendors } from "../hooks/useVendors.js";

function VendorPage() {
  const { id } = useParams();
  const { vendors, loading, error, reload } = useVendors();
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = searchParams.get("q") || "";

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={reload} />;
  }

  const vendor = vendors.find((vendor) => vendor.id === id);

  if (!vendor) {
    return <h2>Vendor not found</h2>;
  }

  const filteredMenu = vendor.menu.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  function handleSearchChange(value) {
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);

      if (value) {
        nextParams.set("q", value);
      } else {
        nextParams.delete("q");
      }

      return nextParams;
    });
  }

  return (
    <>
      <h2 className="section-title">Menu: {vendor.name}</h2>

      <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />

      <Menu items={filteredMenu} />
    </>
  );
}

export default VendorPage;
