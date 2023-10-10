import React, { useEffect, useState } from "react";
import { publicRequest } from "../../apiRequest";

const MenuSections = ({ onSectionsLoad }) => {
  const [men, setMen] = useState([]);
  const [women, setWomen] = useState([]);
  const [instock, setInstock] = useState([]);

  useEffect(() => {
    const fetchMenProducts = async () => {
      try {
        const res = await publicRequest.get("products?category=men");
        setMen(res.data);
      } catch (err) {
        console.error("Помилка при отриманні чоловічих товарів", err);
      }
    };

    const fetchWomenProducts = async () => {
      try {
        const res = await publicRequest.get("products?category=women");
        setWomen(res.data);
      } catch (err) {
        console.error("Помилка при отриманні жіночих товарів", err);
      }
    };

    const fetchInstockProducts = async () => {
      try {
        const res = await publicRequest.get("products?instock");
        setInstock(res.data);
      } catch (err) {
        console.error("Помилка при отриманні товарів, які є в наявності", err);
      }
    };

    fetchMenProducts();
    fetchWomenProducts();
    fetchInstockProducts();
  }, []);

  useEffect(() => {
    onSectionsLoad({ men, women, instock });
  }, [men, women, instock, onSectionsLoad]);

  return (
    <div>
      {}
    </div>
  );
};

export default MenuSections;
