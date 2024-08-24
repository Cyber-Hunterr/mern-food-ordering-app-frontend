import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";

type Props = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
}

const PaginationSelector = ({page, pages, onPageChange}: Props) => {
  const pageNumbers = [];
  for(let i = 1; i <= pages; i++){
    pageNumbers.push(i);
  }
  
  return <Pagination>
    <PaginationContent>
      {page !== 1 && (
        <PaginationItem>
          <PaginationPrevious href="#" onClick={() => onPageChange(page - 1)} />
        </PaginationItem>
      )}
      {pageNumbers.map((pageNumber) => (
        <PaginationItem key={pageNumber}>
          <PaginationLink href="#" onClick={() => onPageChange(pageNumber)} isActive={page === pageNumber}>{pageNumber}</PaginationLink>
        </PaginationItem>
      ))}
      
      {page !== pageNumbers.length && (
        <PaginationItem>
          <PaginationNext href="#" onClick={() => onPageChange(page + 1)} />
        </PaginationItem>
      )}
    </PaginationContent>
  </Pagination>
}

export default PaginationSelector;