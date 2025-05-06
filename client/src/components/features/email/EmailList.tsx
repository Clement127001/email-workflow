import { Fragment } from "react";
import ErrorMessage from "@/components/ErrorMessage";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableWithCardSkeleton from "@/components/TableWithCardSkeleton";
import { useEmailData } from "@/hooks/useEmailData";

const EmailList = () => {
  const { emailList, isLoading, error } = useEmailData();

  if (isLoading) return <TableWithCardSkeleton />;
  if (error) return <ErrorMessage error={error} redirectLink="/" />;

  const showEmailList =
    emailList && Array.isArray(emailList) && emailList.length > 0;

  return (
    <div>
      <Table className="w-full text-left">
        <TableHeader className="bg-[#E2E8F0] text-[16px]">
          <TableRow>
            <TableHead className="min-w-[300px] px-8 rounded-l-[10px] py-4 flex-shrink-0">
              Email Title
            </TableHead>
            <TableHead className="min-w-[140px]">Subject</TableHead>
            <TableHead className="max-w-[100px]">Body</TableHead>
            <TableHead className="min-w-[140px]">Date Created</TableHead>
            {/* <TableHead className="min-w-[140px] rounded-r-[10px]">
              Actions
            </TableHead> */}
          </TableRow>
        </TableHeader>
        {showEmailList && (
          <TableBody>
            <TableRow className="h-6 border-t-0 border-b-0" />

            {emailList.map((email) => {
              const { id, name, subject, body, createdAt } = email;

              const modifiedDate = new Date(createdAt).toLocaleString();

              return (
                <Fragment key={id}>
                  <TableRow className="text-[16px] font-normal hover:bg-gray-100">
                    <TableCell className="px-4 text-[#110F43]">
                      {name}
                    </TableCell>
                    <TableCell>
                      <p className="line-clamp-1">{subject}</p>
                    </TableCell>
                    <TableCell>
                      <p className="line-clamp-1">{body}</p>
                    </TableCell>
                    <TableCell>{modifiedDate}</TableCell>
                    {/* <TableCell>
                      <div
                        className="flex gap-2"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <Link
                          href={"/admin/book/edit/" + id}
                          className="p-[6px__4px] hover:bg-white rounded-sm cursor-pointer"
                        >
                          <Edit className="h-5 text-app-admin-primary-500" />
                        </Link>
                        {canDeleteBook && (
                          <div
                            className="p-[6px__4px] hover:bg-white rounded-sm cursor-pointer"
                            onClick={() => {
                              handleOpenBookDeleteModal(id);
                            }}
                          >
                            <Trash className="h-5 text-app-accent-error-500" />
                          </div>
                        )}
                      </div>
                    </TableCell> */}
                  </TableRow>
                </Fragment>
              );
            })}
          </TableBody>
        )}
      </Table>

      {!showEmailList && (
        <p className="w-full text-center font-medium text-app-accent-error-500 py-10">
          No books found for given filters
        </p>
      )}
    </div>
  );
};

export default EmailList;
