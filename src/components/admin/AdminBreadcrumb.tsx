import { Link } from "@tanstack/react-router";

import { PixelIcon } from "@/components/pixel";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Migas de pan de las subpáginas del panel admin: "Panel › {página actual}".
export function AdminBreadcrumb({ current }: { current: string }) {
  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList className="text-lg sm:text-xl">
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link
              to="/admin"
              className="flex items-center gap-2 underline-offset-4 hover:underline"
            >
              <PixelIcon name="shield" scale={2} className="text-cyan" />
              Panel
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{current}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
