import { Button } from "@heroui/button"

export default function Navbar() {
    function handleChange(path : string) {
        window.location.href = path;
    }

    return (
        <div
            className="flex justify-between items-center p-4 bg-gray-800 text-white"
        >
            <Button
                onPress={() => handleChange('/kanban')}
            >
                Kanban
            </Button>
            <Button
                onPress={() => handleChange('/list')}
            >
                Lista
            </Button>
            <Button
                onPress={() => handleChange('/taskEdit')}
            >
                Nova Task
            </Button>
        </div>
    )
}