import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Button} from "@heroui/button";
import { FormEvent, useState } from "react";

export default function LoginPage() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        window.location.href = "/list";
    }

    return (
        <Form
            className="w-full max-w-xs flex flex-col gap-4 justify-center items-center"
            onSubmit={handleSubmit}
        >
            <Input
                isRequired
                label="Usuário"
                name="username"
                placeholder="Informe seu usuário"
                type="text"
                defaultValue={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <Input
                isRequired
                label="Senha"
                name="password"
                placeholder="Informe sua senha"
                type="password"
                defaultValue={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button
                type="submit"
                variant="solid"
                color="primary"
            >
                Submit
            </Button>
        </Form>
    );
}

