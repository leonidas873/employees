import Link from "next/link";
import { useEffect, useState } from "react";
import MainLayout from "../components/common/MainLayout/MainLayout";
import styles from "../styles/Employees.module.css";
import { AiFillLike } from "react-icons/ai";



const Employees = ({ employees, dropdownData }) => {
  const { jobsData, locationsData } = dropdownData;
  const [selectedJob, setSelectedJob] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [sortByLikes, setSortByLikes] = useState("");
  const [employeesData, setEmployeesData] = useState([]);
  const [topRated, setTopRated] = useState([]);

  useEffect(() => {
    let res = []
      .concat(employees)
      .sort((a, b) => b.liked - a.liked)
      .slice(0, 3)
      .map((el) => el.id);
    setTopRated(res);
  }, []);

  console.log(topRated);
  function handleJobFilterChange(e) {
    setSelectedJob(e.target.value);
  }

  function handleLocationFilterChange(e) {
    setSelectedLocation(e.target.value);
  }

  function handleSortByLikesChange(e) {
    setSortByLikes(e.target.value);
  }

  function handleFilterByJob(array) {
    if (selectedJob) {
      return array.filter((item) => item.job_id == selectedJob);
    } else {
      return array;
    }
  }

  function handleFilterByLocation(array) {
    if (selectedLocation) {
      return array.filter((item) => item.location_id == selectedLocation);
    } else {
      return array;
    }
  }

  function handleSortByLikes(array) {
    if (sortByLikes == "asc") {
      console.log("asc");
      return [].concat(array).sort((a, b) => a.liked - b.liked);
    } else if (sortByLikes == "desc") {
      console.log("desc");
      return [].concat(array).sort((a, b) => b.liked - a.liked);
    } else {
      return [].concat(array);
    }
  }

  useEffect(() => {
    let result = employees;
    result = handleFilterByJob(result);
    result = handleFilterByLocation(result);
    result = handleSortByLikes(result);
    console.log(result);
    setEmployeesData(result);
    console.log(selectedJob, selectedLocation, sortByLikes);
  }, [selectedJob, selectedLocation, sortByLikes]);

  return (
    <MainLayout>
      <div className={styles.main}>
        <div className={styles.dropdowns}>
          <div className={styles.dropdown}>
            sort by likes:{" "}
            <select onChange={handleSortByLikesChange} defaultValue={""}>
              <option value="">none</option>
              <option value={"asc"}>low to high</option>
              <option value={"desc"}>high to law</option>
            </select>
          </div>
          <div className={styles.dropdown}>
            filter by job:{" "}
            <select onChange={handleJobFilterChange} defaultValue={""}>
              <option value="">none</option>
              {jobsData.map((job) => (
                <option value={job.id} key={job.id}>
                  {job.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.dropdown}>
            filter by location:{" "}
            <select onChange={handleLocationFilterChange} defaultValue={""}>
              <option value="">none</option>
              {locationsData.map((location) => (
                <option value={location.id} key={location.id}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles.employeesContainer}>
          {employeesData?.map((emp) => (
            <Link href="/employee/[id]" as={`/employee/${emp.id}`} key={emp.id}>
              <div className={styles.card}>
                <div className={styles.cardImg}>
                  <img
                    src={`https://test-task-api-optimo.herokuapp.com${emp.avatar}`}
                    alt=""
                  />
                </div>
                <p>{emp.name}</p>
                <p>{emp.description}</p>
                <p>
                  <AiFillLike /> {emp.liked}
                </p>
                {topRated.includes(emp.id) && (
                  <div className={styles.popular}>popular</div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Employees;

export const getStaticProps = async () => {
  const res = await fetch(
    "https://test-task-api-optimo.herokuapp.com/employee"
  );
  const employees = await res.json();
  const jobsData = await fetch(
    "https://test-task-api-optimo.herokuapp.com/job"
  ).then((res) => res.json());
  const locationsData = await fetch(
    "https://test-task-api-optimo.herokuapp.com/location"
  ).then((res) => res.json());

  return {
    props: {
      employees,
      dropdownData: {
        jobsData,
        locationsData,
      },
    },
  };
};
