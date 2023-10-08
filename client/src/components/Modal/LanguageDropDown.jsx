import React, { useState } from "react";
import styled from "styled-components";

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: white;
  font-size: 16px;
`;

const DropdownList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #fff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  display: ${({ open }) => (open ? "block" : "none")};
`;

const DropdownItem = styled.li`
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const LanguageDropdown = ({ open, toggleDropdown }) => {
  const languages = [
    { code: "en", label: "EN" },
    { code: "ua", label: "UA" },
  ];

  // Отримуємо збережену мову з кешу або встановлюємо англійську мову за замовчуванням
  const savedLanguage = localStorage.getItem("selectedLanguage") || "en";
  const [selectedLanguage, setSelectedLanguage] = useState(savedLanguage);

  const handleLanguageChange = (code) => {
    toggleDropdown(); // Закриваємо випадаючий список після вибору мови
    setSelectedLanguage(code);

    // Зберігаємо вибрану мову в кеші
    localStorage.setItem("selectedLanguage", code);

    // Додайте код для зміни мови на вашому веб-сайті за допомогою і18next або іншої бібліотеки
    console.log(`Selected language: ${code}`);
  };

  return (
    <DropdownContainer>
      <DropdownButton onClick={toggleDropdown}>
        {selectedLanguage}
      </DropdownButton>
      <DropdownList open={open}>
        {languages.map(({ code, label }) => (
          <DropdownItem key={code} onClick={() => handleLanguageChange(code)}>
            {label}
          </DropdownItem>
        ))}
      </DropdownList>
    </DropdownContainer>
  );
};

export default LanguageDropdown;
