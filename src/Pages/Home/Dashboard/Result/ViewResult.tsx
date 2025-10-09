import { useSelector } from "react-redux";
import { RootState } from "../../../../State/Store";
import Sidebar from "../../../../Components/Sidebar";

const ViewResult = () => {
  const result = useSelector(
    (state: RootState) => state.studentsResult?.result
  );

  if (!result) {
    return (
      <p className="text-center mt-10 text-gray-500">No result selected</p>
    );
  }

  const { student, sessions } = result;

  return (
    <div className="flex">
      <Sidebar />
      <div className="max-w-5xl md:w-full max-h-screen overflow-y-auto !mx-auto !mt-10 !p-6 bg-white rounded-2xl shadow-md">
        {/* Student Info */}
        <div className="!mb-8 border-b !pb-4  sticky">
          <h2 className="text-2xl font-semibold text-gray-800">
            Student Result
          </h2>
          <p className="text-gray-600">
            Name: <span className="font-medium">{student.name}</span>
          </p>
          <p className="text-gray-600">
            Email: <span className="font-medium">{student.email}</span>
          </p>
        </div>

        {/* All Sessions */}
        <div className="!space-y-6">
          {sessions.map((session: any, index: number) => {
            const start = new Date(session.start_time);
            const end = new Date(session.end_time);
            const duration = Math.floor(
              (end.getTime() - start.getTime()) / 60000
            );

            return (
              <div
                key={session.test_session_id}
                className="border rounded-lg !p-5 shadow-sm bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-700 !mb-2">
                  Session {index + 1} (ID: {session.test_session_id})
                </h3>
                <p className="text-gray-600">Start: {start.toLocaleString()}</p>
                <p className="text-gray-600">End: {end.toLocaleString()}</p>
                <p className="text-gray-600 !mb-4">
                  Duration:
                  <span className="font-medium">{duration} minutes</span>
                </p>

                {/* Scores */}
                <h4 className="text-md font-semibold text-gray-700 !mb-2">
                  Scores by Subject
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-200 rounded-lg !mb-4">
                    <thead className=" bg-blue-600 text-white">
                      <tr>
                        <th className="!px-4 !py-2 text-left">Subject</th>
                        <th className="!px-4 !py-2 text-left">Score</th>
                        {/* <th className="!px-4 !py-2 text-left">Total</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(session.scores_by_subject).map(
                        ([subject, score]: any, i) => (
                          <tr key={i} className="border-b hover:bg-gray-50">
                            <td className="!px-4 !py-2">{subject}</td>
                            <td className="!px-4 !py-2">{score.score}</td>
                            {/* <td className="!px-4 !py-2">{score.total}</td> */}
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Failed Questions */}
                <h4 className="text-md font-semibold text-gray-700 !mb-2">
                  Failed Questions by Subject
                </h4>
                <ul className="list-disc !pl-6 text-gray-700 !mb-4">
                  {Object.entries(session.failed_questions_by_subject).map(
                    ([subject, questions]: any, i) => (
                      <li key={i}>
                        {subject}:{" "}
                        <span className="font-medium">{questions.length}</span>{" "}
                        failed
                      </li>
                    )
                  )}
                </ul>

                {/* <div className="flex justify-end">
                <button
                  onClick={() => console.log(session.answers)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  View Answers
                  </button>
                  </div> */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ViewResult;
