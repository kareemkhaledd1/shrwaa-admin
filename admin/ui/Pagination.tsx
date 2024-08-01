"use client";

import { useRouter, useSearchParams } from "next/navigation";

const PAGE_SIZE = 8;

function Pagination({ count }: { count: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const pageCount = Math.ceil(count / PAGE_SIZE);

  function changePage(newPage: number) {
    if (newPage < 1 || newPage > pageCount) return; // Prevent navigating to invalid pages
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("page", newPage.toString());
    router.push(`?${newSearchParams.toString()}`);
  }

  if (pageCount <= 1) return null;

  return (
    <div className="flex justify-between items-center py-4 px-5 bg-slate-100">
      <p>
        Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to{" "}
        <span>
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
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
