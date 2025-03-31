import UserForm from "./forms/UserForm";

export default function Settings() {
  return (
    <div className="flex flex-col items-center md:items-start md:flex-row justify-center w-full">
      <div className="w-full">
        <UserForm />
      </div>
    </div>
  );
}