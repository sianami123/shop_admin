"use client";

import { Button, ButtonGroup, IconButton } from "@chakra-ui/react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

interface PaginationProps {
  count: number;
  pageSize: number;
  page: number;
  onPageChange?: (page: number) => void;
}

export function PaginationRoot({
  count,
  pageSize,
  page,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(count / pageSize);

  return (
    <ButtonGroup spacing={2}>
      <IconButton
        aria-label="Previous page"
        icon={<HiChevronLeft />}
        onClick={() => onPageChange?.(page - 1)}
        isDisabled={page <= 1}
      />
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
        <Button
          key={pageNum}
          variant={pageNum === page ? "solid" : "outline"}
          onClick={() => onPageChange?.(pageNum)}
        >
          {pageNum}
        </Button>
      ))}
      <IconButton
        aria-label="Next page"
        icon={<HiChevronRight />}
        onClick={() => onPageChange?.(page + 1)}
        isDisabled={page >= totalPages}
      />
    </ButtonGroup>
  );
}

export const PaginationNextTrigger = IconButton;
export const PaginationPrevTrigger = IconButton;
export const PaginationItems = ButtonGroup;
