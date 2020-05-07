import React from "react";

const Tag = ({ label }) => {
  return <span>{label}</span>;
};

export default function TagsList() {
  //TODO сетевой запрос за списком тегов
  return (
    <div>
      <Tag label={"test"} />
    </div>
  );
}
