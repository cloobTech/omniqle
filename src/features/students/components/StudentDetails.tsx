import React, { useEffect } from "react";
import { useNavbar } from "@src/index";
import { useNavigate } from "react-router-dom";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { BsCheckCircle } from "react-icons/bs";
import { Button } from "@mantine/core";
import StudentDetailCards from "./StudentDetailCards";
import { useModal } from "@src/index";
import VerifyStudent from "../../verification/components/VerifyUser";
import { useGetSingleStudentQuery } from "../services/api";
import { useAppSelector } from "@src/index";
import { useParams } from "react-router-dom";
import { StudentDetailCardsSkeleton } from "./StudentDetailSkeleton";
import { useLocation } from "react-router-dom";

const StudentDetails: React.FC = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const parsedStudentId = studentId ? parseInt(studentId, 10) : undefined;
  const navigate = useNavigate();
  const location = useLocation();
  const { hideNav, displayNav } = useNavbar();
  const { showModal } = useModal();
  const schoolId = useAppSelector((state) => state?.school?.schoolId);

  const { data: studenDetails, isLoading } = useGetSingleStudentQuery({
    schoolId: schoolId,
    studentId: parsedStudentId,
  });

  useEffect(() => {
    hideNav();

    return () => {
      displayNav();
    };
  }, []);
  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 ">
          <FaAngleDoubleLeft
            className="cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h1 className="text-xl font-bold ">Student</h1>
        </div>
        {studenDetails?.verification_status === "verified" ? (
          <div className="bg-[var(--primary)] flex text-white items-center p-1 rounded-2xl px-2 gap-2 text-xs">
            <BsCheckCircle /> Verified
          </div>
        ) : (
          <Button
            style={{
              fontSize: "0.75rem",
            }}
            onClick={() =>
              showModal(
                <VerifyStudent
                  fullName={studenDetails?.full_name}
                  personId={location?.state?.personId}
                />,
                {
                  size: "auto",
                  withCloseButton: false,
                }
              )
            }
          >
            Verify student
          </Button>
        )}
      </div>
      {/*  */}
      {isLoading ? (
        <StudentDetailCardsSkeleton />
      ) : (
        <StudentDetailCards {...studenDetails} />
      )}
    </div>
  );
};

export default StudentDetails;
