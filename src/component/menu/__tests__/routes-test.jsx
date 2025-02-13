import { baseRoutes, getRoute } from '../routes';

test('returns all baseRoutes', () => {
    expect(baseRoutes).toHaveLength(11);
    expect(baseRoutes).toMatchSnapshot();
});

test('getRoute() returns named route', () => {
    const featuresRoute = getRoute('/features');
    expect(featuresRoute.path).toEqual('/features');
});
