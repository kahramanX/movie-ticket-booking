"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useLanguage } from "@/contexts/languageContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Plus,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  ChevronDown,
} from "lucide-react";

// Blog veri tipi
type Blog = {
  id: number;
  title: string;
  author: {
    name: string;
    avatar: string;
    initials: string;
  };
  category: string;
  status: "published" | "draft" | "archived";
  views: number;
  createdAt: string;
  updatedAt: string;
};

// Statik veriler - API entegrasyonu sonra yapılacak
const blogsData: Blog[] = [
  {
    id: 1,
    title: "Sinema Sanatı ve Modern Yaklaşımlar",
    author: {
      name: "Ahmet Yılmaz",
      avatar: "",
      initials: "AY",
    },
    category: "Sinema",
    status: "published",
    views: 1250,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
  },
  {
    id: 2,
    title: "Film Eleştirisi: Kült Filmlerin Analizi",
    author: {
      name: "Zeynep Demir",
      avatar: "",
      initials: "ZD",
    },
    category: "Eleştiri",
    status: "published",
    views: 890,
    createdAt: "2024-01-18",
    updatedAt: "2024-01-22",
  },
  {
    id: 3,
    title: "Dijital Sinema Teknolojileri",
    author: {
      name: "Mehmet Kaya",
      avatar: "",
      initials: "MK",
    },
    category: "Teknoloji",
    status: "draft",
    views: 0,
    createdAt: "2024-01-25",
    updatedAt: "2024-01-25",
  },
  {
    id: 4,
    title: "Oscar Adayları ve Beklentiler",
    author: {
      name: "Ayşe Çelik",
      avatar: "",
      initials: "AÇ",
    },
    category: "Haber",
    status: "published",
    views: 2340,
    createdAt: "2024-02-01",
    updatedAt: "2024-02-05",
  },
  {
    id: 5,
    title: "Yerli Sinema ve Başarı Hikayeleri",
    author: {
      name: "Can Öztürk",
      avatar: "",
      initials: "CÖ",
    },
    category: "Kültür",
    status: "published",
    views: 1567,
    createdAt: "2024-02-10",
    updatedAt: "2024-02-12",
  },
  {
    id: 6,
    title: "Film Müzikleri ve Etkisi",
    author: {
      name: "Elif Şahin",
      avatar: "",
      initials: "EŞ",
    },
    category: "Müzik",
    status: "archived",
    views: 678,
    createdAt: "2024-02-15",
    updatedAt: "2024-02-18",
  },
];

export const BlogList = () => {
  const { t } = useLanguage();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState("");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return (
          <Badge variant="default" className="bg-green-500">
            Yayında
          </Badge>
        );
      case "draft":
        return <Badge variant="secondary">Taslak</Badge>;
      case "archived":
        return <Badge variant="outline">Arşivlendi</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Column definitions
  const columns: ColumnDef<Blog>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-8 px-2 hover:bg-transparent"
          >
            ID
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return <span className="font-medium">{row.getValue("id")}</span>;
      },
    },
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-8 px-2 hover:bg-transparent"
          >
            Başlık
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return <span className="font-semibold">{row.getValue("title")}</span>;
      },
    },
    {
      accessorKey: "author",
      header: "Yazar",
      cell: ({ row }) => {
        const blog = row.original;
        return (
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={blog.author.avatar} />
              <AvatarFallback>{blog.author.initials}</AvatarFallback>
            </Avatar>
            <span className="text-sm">{blog.author.name}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-8 px-2 hover:bg-transparent"
          >
            Durum
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return getStatusBadge(row.getValue("status"));
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const blog = row.original;

        return (
          <div className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon-sm">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Menüyü aç</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>İşlemler</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Eye className="h-4 w-4 mr-2" />
                  Görüntüle
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit className="h-4 w-4 mr-2" />
                  Düzenle
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Sil
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: blogsData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, columnId, filterValue) => {
      const blog = row.original;
      const search = filterValue.toLowerCase();
      return (
        blog.title.toLowerCase().includes(search) ||
        blog.author.name.toLowerCase().includes(search) ||
        blog.category.toLowerCase().includes(search) ||
        blog.status.toLowerCase().includes(search)
      );
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  });

  return (
    <div className="flex-1 overflow-auto p-6 space-y-6">
      {/* Başlık ve Arama */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">{t("Blog List")}</h1>
          <p className="text-muted-foreground mt-1">
            Tüm blog yazılarını görüntüleyin ve yönetin
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Yeni Blog Ekle
        </Button>
      </div>

      {/* Filtreler ve Arama */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Blog Yazıları</CardTitle>
              <CardDescription>
                {table.getFilteredRowModel().rows.length} adet blog yazısı
                bulundu
              </CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Sütunlar <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id === "id"
                          ? "ID"
                          : column.id === "title"
                          ? "Başlık"
                          : column.id === "author"
                          ? "Yazar"
                          : column.id === "status"
                          ? "Durum"
                          : column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Blog ara..."
                className="pl-9"
                value={globalFilter ?? ""}
                onChange={(e) => setGlobalFilter(e.target.value)}
              />
            </div>
          </div>

          {/* Tablo */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      Blog yazısı bulunamadı
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} /{" "}
              {table.getFilteredRowModel().rows.length} seçili
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-1 text-sm font-medium">
                  <span>Sayfa</span>
                  <span className="font-semibold">
                    {table.getState().pagination.pageIndex + 1}
                  </span>
                  <span>of</span>
                  <span className="font-semibold">{table.getPageCount()}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogList;
