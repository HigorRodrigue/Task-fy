import { CircleSmall } from "lucide-react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Link } from "@heroui/link";
import { Divider } from "@heroui/divider";

interface Props {
    id: string;
    title: string;
    content: string;
    status: "todo" | "in-progress" | "done";
}

export default function CardKanban({ id, title, content, status }: Props) {
    return (
        <Card className="w-full">
            <CardHeader className="font-bold text-lg flex items-center gap-2">
                <CircleSmall className={status === "done" ? "text-green-500" : status === "in-progress" ? "text-yellow-500" : "text-red-500"} />
                <span>{title}</span>
            </CardHeader>
            <Divider />
            <CardBody>
                {content.length > 100 ? content.substring(0, 100) + "..." : content}
            </CardBody>
            <Divider />
            <CardFooter>
                <Link
                    showAnchorIcon
                    href={`/taskInfo/${id}`}
                >
                    Ver detalhes.
                </Link>
            </CardFooter>
        </Card>
    );
}