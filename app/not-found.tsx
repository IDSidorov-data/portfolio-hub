import Container from '@/components/Container';
export default function NotFound() {
  return (
    <Container className="py-20 text-center">
      <h1 className="text-3xl font-semibold mb-2">Страница не найдена</h1>
      <p className="text-zinc-600">Похоже, ссылка устарела или набрана с ошибкой.</p>
    </Container>
  );
}