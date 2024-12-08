import { render, screen } from '@testing-library/react';
import App from './App';
import * as test from "node:test";

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders post update form', () => {
  const post = { id: 1, title: 'Post 1', content: 'Content 1' };
  render(<PostUpdateForm post={post} />);
  expect(screen.getByLabelText(/title/i)).toHaveValue('Post 1');
  expect(screen.getByLabelText(/content/i)).toHaveValue('Content 1');
});

test('renders navbar', () => {
  render(<Navbar user={{ username: 'testuser' }} />);
  expect(screen.getByText(/logout/i)).toBeInTheDocument();
});

test('redirects to login if not authenticated', () => {
  render(
    <Router>
      <Routes>
        <Route path='/protected' element={<ProtectedComponent />} />
        <Route path='/login' element={<LoginForm />} />
      </Routes>
    </Router>
  );
  expect(screen.getByText(/login/i)).toBeInTheDocument();
});

test('renders login form', () => {
  render(<LoginForm />);
  expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});

test('redirects to login if not authenticated', () => {
  render(
    <Router>
      <Routes>
        <Route path='/protected' element={<ProtectedComponent />} />
        <Route path='/login' element={<LoginForm />} />
      </Routes>
    </Router>
  );
  expect(screen.getByText(/login/i)).toBeInTheDocument();
});

test('renders user profile page', () => {
  render(<UserProfile user={{ username: 'testuser', email: 'testuser@example.com' }} />);
  expect(screen.getByText(/testuser/i)).toBeInTheDocument();
  expect(screen.getByText(/testuser@example.com/i)).toBeInTheDocument();
});

test('renders post creation form', () => {
  render(<PostCreationForm />);
  expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/content/i)).toBeInTheDocument();
});

test('renders list of posts', () => {
  const posts = [{ id: 1, title: 'Post 1' }, { id: 2, title: 'Post 2' }];
  render(<PostList posts={posts} />);
  expect(screen.getByText(/post 1/i)).toBeInTheDocument();
  expect(screen.getByText(/post 2/i)).toBeInTheDocument();
});

test('deletes a post', async () => {
  const posts = [{ id: 1, title: 'Post 1' }];
  render(<PostList posts={posts} />);
  fireEvent.click(screen.getByText(/delete/i));
  await waitFor(() => expect(screen.queryByText(/post 1/i)).not.toBeInTheDocument());
});

test('submits post update form', async () => {
  const post = { id: 1, title: 'Post 1', content: 'Content 1' };
  render(<PostUpdateForm post={post} />);
  fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Updated Post' } });
  fireEvent.change(screen.getByLabelText(/content/i), { target: { value: 'Updated Content' } });
  fireEvent.click(screen.getByText(/submit/i));
  await waitFor(() => expect(screen.getByText(/updated post/i)).toBeInTheDocument());
});