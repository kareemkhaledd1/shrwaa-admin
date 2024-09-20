"use client";

import { useRouter, useSearchParams } from "next/navigation";

function Pagination({ count, pageSize }: { count: number; pageSize: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const pageCount = Math.ceil(count / pageSize);

  function changePage(newPage: number) {
    if (newPage < 1 || newPage > pageCount) return; // Prevent navigating to invalid pages
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("page", newPage.toString());
    router.push(`?${newSearchParams.toString()}`);
  }

  if (pageCount <= 1) return null;

  return (
    <div className="flex justify-between w-full items-center">
      <p>
        Showing <span>{(currentPage - 1) * pageSize + 1}</span> to{" "}
        <span>
          {currentPage === pageCount ? count : currentPage * pageSize}
        </span>{" "}
        of <span>{count}</span> results
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border border-orange-600 rounded bg-orange-500 text-white disabled:opacity-30"
        >
          Previous
        </button>
        <button
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === pageCount}
          className="px-4 py-2 border border-orange-600 rounded bg-orange-500 text-white disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
