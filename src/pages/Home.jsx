import ProductList from "./ProductList";
import HeroBanner from "../components/HeroBanner";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <div className="container" style={{ marginTop: "40px" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "20px", textAlign: "center" }}>
          Featured Products
        </h2>
        <ProductList />
      </div>
    </>
  );
}
