import React, {useState} from "react";
import "./Profile.css";

const Profile: React.FC = () => {

    const [formData, setFormData] = useState({position: "", department: "", company: ""});

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        console.log(formData);
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    }

    const {position, department, company} = formData;

    return (
        <section className="profile">
            <h3>Пользователь</h3>
            <form className="form" onSubmit={handleSubmit}>
                <div className="wrapper">
                    <div className="labelWrapper">
                        <label htmlFor="position">Должность</label>
                        <label htmlFor="department">Отдел</label>
                        <label htmlFor="company">Компания</label>
                    </div>
                    <div className="inputWrapper">
                        <input type="text" name="position" placeholder="Не указано" value={position}
                               onChange={handleChange}/>
                        <input type="text" name="department" placeholder="Не указано" value={department}
                               onChange={handleChange}/>
                        <input type="text" name="company" placeholder="Не указано" value={company}
                               onChange={handleChange}/>
                    </div>
                </div>
                <button type="submit">Сохранить</button>
            </form>
        </section>
    );
};

export default Profile;