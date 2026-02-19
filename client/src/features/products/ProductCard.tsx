import { formatToman } from "../../utils/helper.js";
import { Link } from "react-router-dom";
export default function ProductCard({ product, onClose, setQuery }) {
  function handelClose() {
    setQuery("");
    onClose();
  }
  return (
    <Link to={`/products/${product.slug}`} onClick={handelClose}>
      <li className="bg-grey-0 mt-2 flex items-center gap-3 rounded-xl p-3 shadow">
        <img
          src={`http://localhost:3000/img/products/${product.imageCover}`}
          alt={product.name}
          className="h-14 rounded-lg object-cover"
        />

        <div className="flex flex-col justify-center gap-1">
          <h3 className="text-grey-800 font-bold">{product.name}</h3>
          <p className="text-grey-600 text-xs font-medium">
            {formatToman(product.price)}
          </p>
        </div>
      </li>
    </Link>
  );
}
